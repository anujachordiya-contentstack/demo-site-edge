import { sendLogsAndMetrics } from './instrumentation.node.js';

export async function register() {
  console.log('A');
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('B');
    await import('./instrumentation.node.js');
    console.log('C');
    sendLogsAndMetrics();
  }
  console.log('D');
}