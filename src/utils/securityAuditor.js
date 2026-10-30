/**
 * ShieldGuard Mobile Security & Privacy Auditor Engine
 * Evaluates mobile device security posture and permission risks.
 */

export const AUDIT_CATEGORIES = {
  PERMISSIONS: 'Permissions Risk',
  NETWORK: 'Network Security',
  SYSTEM: 'System Integrity',
  PRIVACY: 'Telemetry & Tracking',
};

/**
 * Calculates overall security posture score (0 to 100).
 */
export function calculateSecurityScore(metrics) {
  let score = 100;
  const deductions = [];

  if (metrics.cameraAccessAlways) {
    score -= 15;
    deductions.push('Camera permission granted without foreground restriction (-15)');
  }
  if (metrics.micAccessAlways) {
    score -= 15;
    deductions.push('Microphone permission active without prompt (-15)');
  }
  if (metrics.preciseLocationEnabled) {
    score -= 10;
    deductions.push('Precise GPS telemetry active (-10)');
  }
  if (!metrics.screenLockActive) {
    score -= 30;
    deductions.push('Device has no biometric or PIN screen lock (-30)');
  }
  if (metrics.unknownSourcesAllowed) {
    score -= 20;
    deductions.push('Installation from unknown sources enabled (-20)');
  }
  if (metrics.publicWifiUnencrypted) {
    score -= 10;
    deductions.push('Connected to unencrypted Wi-Fi access point (-10)');
  }

  score = Math.max(0, Math.min(100, score));

  let grade = 'A+';
  let status = 'Secure';
  if (score < 50) {
    grade = 'D';
    status = 'Critical Risk';
  } else if (score < 70) {
    grade = 'C';
    status = 'Vulnerable';
  } else if (score < 85) {
    grade = 'B';
    status = 'Moderate';
  }

  return {
    score,
    grade,
    status,
    deductions,
    totalDeductions: deductions.length,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Generates recommended remediation steps based on audit.
 */
export function getRemediationSteps(metrics) {
  const steps = [];
  if (metrics.cameraAccessAlways) {
    steps.push({ id: 1, action: 'Change Camera permission to "Only while using the app".' });
  }
  if (metrics.micAccessAlways) {
    steps.push({ id: 2, action: 'Restrict Microphone access in Android/iOS App Settings.' });
  }
  if (!metrics.screenLockActive) {
    steps.push({ id: 3, action: 'Enable Face ID, Fingerprint, or 6-digit PIN immediately.' });
  }
  if (metrics.unknownSourcesAllowed) {
    steps.push({ id: 4, action: 'Disable "Install Unknown Apps" in developer options.' });
  }
  return steps;
}
