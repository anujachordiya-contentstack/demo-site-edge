import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from  '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from  '@opentelemetry/exporter-metrics-otlp-proto';
import { Resource } from '@opentelemetry/resources';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { PeriodicExportingMetricReader, MeterProvider } from '@opentelemetry/sdk-metrics';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { config } from 'dotenv';

config();

const otelUrl = process.env.OTEL_URL;
const otelAuthToken = process.env.OTEL_AUTH;
const shouldForwardTraces = true;

class LoggingOTLPTraceExporter extends OTLPTraceExporter {
  export(spans, resultCallback) {
    if (!spans.length) {
      return;
    }
    console.log(`Exporting ${spans.length} trace(s)`);

    super.export(spans, (result) => {
      if (result.code === 0) {
        console.log('Traces exported successfully with status code 200');
      } else {
        console.log(`Failed to export traces with status code ${JSON.stringify(result)}`);
      }
      resultCallback(result);
    });
  }
}

class LoggingOTLPMetricExporter extends OTLPMetricExporter {
  export(metrics, resultCallback) {
    if (!metrics.length) {
      return;
    }
    console.log(`Exporting ${metrics.length} metric(s)`);
    super.export(metrics, (result) => {
      if (result.code === 0) {
        console.log('Metrics exported successfully with status code 200');
      } else {
        console.log(`Failed to export metrics with status code ${result.code}`);
      }
      resultCallback(result);
    });
  }
}

let traceExporterInstance = null;
let metricExporterInstance = null;

if (shouldForwardTraces) {
  traceExporterInstance = new LoggingOTLPTraceExporter({
    url: `${otelUrl}/v1/traces`,
    headers: {
      'Authorization': `Api-Token ${otelAuthToken}`,
      'Content-Type': process.env.CONTENT_TYPE,
    },
  });

  metricExporterInstance = new LoggingOTLPMetricExporter({
    url: `${otelUrl}/v1/metrics`,
    headers: {
      'Authorization': `Api-Token ${otelAuthToken}`,
      'Content-Type': process.env.CONTENT_TYPE,
    },
  });

  console.log(`Tracing and metrics enabled. Sending data to: ${otelUrl}`);
} else {
  console.log('Tracing and metrics disabled. Not sending data.');
}

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.APP_NAME,
  }),
  spanProcessor: traceExporterInstance ? new SimpleSpanProcessor(traceExporterInstance) : undefined,
  metricReader: metricExporterInstance ? new PeriodicExportingMetricReader({
    exporter: metricExporterInstance,
    exportIntervalMillis: 1000, // Export metrics every 1000 milliseconds
  }) : undefined,
});

export function sendLogsAndMetrics() {
  sdk.start();
}

export const traceExporter = traceExporterInstance;
export const metricExporter = metricExporterInstance;

const meterProvider = new MeterProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.APP_NAME,
  }),
  metricReader: metricExporter ? new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: 1000, // Export metrics every 1000 milliseconds
  }) : undefined,
});

const meter = meterProvider.getMeter('api-metrics');
export const apiCallCounter = meter.createCounter('api_calls', {
  description: 'Counts the number of API calls',
});