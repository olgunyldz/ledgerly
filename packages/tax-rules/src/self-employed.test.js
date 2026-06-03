import assert from 'node:assert/strict';
import { estimateReserve } from './self-employed.js';

const result = estimateReserve({ annualProfit: 40000 });
assert.equal(result.estimatedTaxToSetAside, 10000);
console.log('tax-rules tests passed');
