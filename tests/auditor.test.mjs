import assert from 'node:assert';
import { calculateSecurityScore, getRemediationSteps } from '../src/utils/securityAuditor.js';

console.log('=== Running ShieldGuard Mobile Security Engine Tests ===\n');

// Test 1: Pristine secure device
const secureMetrics = {
  cameraAccessAlways: false,
  micAccessAlways: false,
  preciseLocationEnabled: false,
  screenLockActive: true,
  unknownSourcesAllowed: false,
  publicWifiUnencrypted: false,
};
const res1 = calculateSecurityScore(secureMetrics);
assert.strictEqual(res1.score, 100, 'Secure device must have 100 score');
assert.strictEqual(res1.grade, 'A+');
console.log('  [PASS] 100/100 Perfect Security Baseline verified.');

// Test 2: Vulnerable device
const vulnMetrics = {
  cameraAccessAlways: true,
  micAccessAlways: true,
  preciseLocationEnabled: true,
  screenLockActive: false,
  unknownSourcesAllowed: true,
  publicWifiUnencrypted: true,
};
const res2 = calculateSecurityScore(vulnMetrics);
assert(res2.score < 50, 'Highly vulnerable device must score below 50');
assert.strictEqual(res2.grade, 'D');
const steps = getRemediationSteps(vulnMetrics);
assert(steps.length >= 4, 'Must offer remediation steps for detected issues');
console.log(`  [PASS] Vulnerability Detection verified (Score: ${res2.score}/100, Grade: ${res2.grade}).`);

console.log('\n[ALL MOBILE TESTS PASSED!]');
