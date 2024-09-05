import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { Resource } from '@opentelemetry/resources'
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions'

const otelUrl = process.env.OTEL_URL; // 'https://your-otel-url.com'
const otelAuthToken = process.env.OTEL_AUTH;

const traceExporter = new OTLPTraceExporter({
  url: otelUrl,
  headers: {
    'Authorization': `Bearer ${otelAuthToken}`,
  },
})
console.log(otelUrl)
// Custom span processor to log trace sending
class LoggingSpanProcessor extends SimpleSpanProcessor {
  onEnd(span) {
    super.onEnd(span)
    console.log(`Sending span: ${span.name}`)
    this._exporter.export([span], (result) => {
      if (result.code !== 0) {
        console.error(`Failed to send span: ${span.name}`, result.error)
      }
    })
  }
}

const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'next-app',
  }),
  spanProcessor: new LoggingSpanProcessor(traceExporter),
})

console.log('Starting SDK...')
sdk.start()
console.log('SDK started.')