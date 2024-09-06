import { sendLogsAndMetrics } from './instrumentation.node.js';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation.node.js');
    sendLogsAndMetrics();
  }
}