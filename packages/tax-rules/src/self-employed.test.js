import assert from 'node:assert/strict';
import {
  calculateClass4NationalInsurance,
  calculateIncomeTax,
  estimateReserve,
} from './self-employed.js';

assert.equal(calculateIncomeTax({ annualProfit: 12570 }), 0);
assert.equal(calculateIncomeTax({ annualProfit: 12571 }), 0.2);
assert.equal(calculateIncomeTax({ annualProfit: 50270 }), 7540);

assert.equal(calculateClass4NationalInsurance({ annualProfit: 12570 }), 0);
assert.equal(calculateClass4NationalInsurance({ annualProfit: 12571 }), 0.06);
assert.equal(calculateClass4NationalInsurance({ annualProfit: 50270 }), 2262);
assert.equal(calculateClass4NationalInsurance({ annualProfit: 60270 }), 2462);

const result = estimateReserve({ annualProfit: 40000 });
assert.equal(result.tax_year, '2025-26');
assert.equal(result.rule_version, '2025-26.0');
assert.deepEqual(result.inputs_snapshot, { annualProfit: 40000, taxYear: '2025-26' });
assert.equal(result.breakdown.estimatedIncomeTax, 5486);
assert.equal(result.breakdown.estimatedClass4NationalInsurance, 1645.8);
assert.equal(result.estimatedTaxToSetAside, 7131.8);
assert.equal(result.reservePercent, 0.18);
assert.ok(result.sources.length >= 2);
assert.ok(result.warnings.some((warning) => warning.includes('accountant review')));

assert.throws(() => estimateReserve({ annualProfit: -1 }), /positive number/);
assert.throws(() => estimateReserve({ annualProfit: 10000, taxYear: '2024-25' }), /Unsupported tax year/);

console.log('tax-rules tests passed');
