import { readFileSync } from 'node:fs';
import { estimateReserve } from './self-employed.js';

const input = JSON.parse(readFileSync(0, 'utf8'));
const result = estimateReserve(input);

process.stdout.write(JSON.stringify(result));
