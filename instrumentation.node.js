import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node'

const otelUrl = process.env.OTEL_URL; // 'https://your-otel-url.com'
const otelAuthToken = process.env.OTEL_AUTH;

const traceExporter = new OTLPTraceExporter({
  url: otelUrl, headers: {
    'Authorization': `Bearer ${otelAuthToken}`,
  },
})

const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'next-app',
  }),
  spanProcessor: new SimpleSpanProcessor(traceExporter),
})

sdk.start()