import { sendLogsAndMetrics, apiCallCounter as apiCallCounter2 } from './instrumentation.node.js';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation.node.js');
    sendLogsAndMetrics();
  }
}
export const apiCallCounter = apiCallCounter2;