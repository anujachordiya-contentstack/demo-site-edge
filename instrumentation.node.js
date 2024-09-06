import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter, OTLPMetricExporter } from '@opentelemetry/exporter-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';

const otelUrl = process.env.OTEL_URL
const otelAuthToken = process.env.OTEL_AUTH;
const shouldForwardTraces = true;

let oneagent;
if (typeof window === 'undefined') {
  oneagent = require('@dynatrace/oneagent-sdk');
}

let oneAgentSdk;
if (oneagent) {
  // Initialize Dynatrace OneAgent SDK
  oneAgentSdk = oneagent.createInstance();
  if (!oneAgentSdk) {
    console.error('Failed to initialize Dynatrace OneAgent SDK');
  } else {
    console.log('Dynatrace OneAgent SDK initialized');
  }
}

let traceExporter = null;
let metricExporter = null;

if (shouldForwardTraces) {
  traceExporter = new OTLPTraceExporter({
    url: otelUrl+'/v1/traces',
    headers: {
      'Authorization': `Api-Token ${otelAuthToken}`,
      'Content-Type': 'application/x-protobuf',
    },
  });

  metricExporter = new OTLPMetricExporter({
    url: otelUrl+'/v1/metrics', 
    headers: {
      'Authorization': `Api-Token ${otelAuthToken}`,
      'Content-Type': 'application/x-protobuf',
    },
  });

  console.log(`Tracing and metrics enabled. Sending data to: ${otelUrl}`);
} else {
  console.log('Tracing and metrics disabled. Not sending data.');
}

// Custom span processor to log trace sending
class LoggingSpanProcessor extends SimpleSpanProcessor {
  onEnd(span) {
    super.onEnd(span);
    console.log(`Span ended: ${span.name}`);

    if (shouldForwardTraces && oneAgentSdk) {
      // Create a custom span using Dynatrace OneAgent SDK
      const dtSpan = oneAgentSdk.traceIncomingRemoteCall({
        serviceMethod: span.name,
        serviceName: 'next-app',
        serviceEndpoint: otelUrl+'/v1/traces',
      });

      dtSpan.start(() => {
        this._exporter.export([span], (result) => {
          if (result.code !== 0) {
            console.error(`Failed to send span: ${span.name}`, result.error);
          } else {
            console.log(`Span sent successfully: ${span.name}`);
          }
          dtSpan.end();
        });
      });
    }
  }
}

if (traceExporter && metricExporter) {
  const spanProcessor = new LoggingSpanProcessor(traceExporter);
  const sdk = new NodeSDK({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: 'next-app',
    }),
    spanProcessor: spanProcessor,
    metricReader: new PeriodicExportingMetricReader({
      exporter: metricExporter,
      exportIntervalMillis: 60000, // Export metrics every 60 seconds
    }),
  });

  sdk.start();
}

// Function to send logs and metrics
export function sendLogsAndMetrics() {
  if (oneAgentSdk) {
      // Send a custom log
      console.log('Custom log message');

      // Send a custom metric
      const customMetric = oneAgentSdk.createIntegerGaugeMetric('custom.metric.example', 'Custom Metric Example');
      customMetric.setValue(42);
    
  }
}