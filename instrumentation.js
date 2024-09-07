import { sendLogsAndMetrics, apiCallCounter as apiCallCounter2 } from './instrumentation.node.js';

if (process.env.NEXT_RUNTIME === 'nodejs') {
  sendLogsAndMetrics();
}

export const apiCallCounter = apiCallCounter2;