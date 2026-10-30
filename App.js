import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { calculateSecurityScore, getRemediationSteps } from './src/utils/securityAuditor';

export default function App() {
  const [metrics, setMetrics] = useState({
    cameraAccessAlways: false,
    micAccessAlways: false,
    preciseLocationEnabled: true,
    screenLockActive: true,
    unknownSourcesAllowed: false,
    publicWifiUnencrypted: false,
  });

  const [auditResult, setAuditResult] = useState(null);

  useEffect(() => {
    setAuditResult(calculateSecurityScore(metrics));
  }, [metrics]);

  const toggleMetric = (key) => {
    setMetrics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getScoreColor = (score) => {
    if (score >= 85) return '#10B981';
    if (score >= 70) return '#F59E0B';
    return '#EF4444';
  };

  if (!auditResult) return null;

  const steps = getRemediationSteps(metrics);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.appName}>SHIELDGUARD</Text>
          <Text style={styles.subTitle}>Mobile Privacy & Security Auditor</Text>
        </View>

        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>DEVICE SECURITY POSTURE</Text>
          <Text style={[styles.scoreValue, { color: getScoreColor(auditResult.score) }]}>
            {auditResult.score}/100
          </Text>
          <Text style={styles.gradeBadge}>GRADE: {auditResult.grade} • {auditResult.status.toUpperCase()}</Text>
        </View>

        <Text style={styles.sectionTitle}>Live Telemetry Checks</Text>
        {Object.keys(metrics).map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.toggleRow}
            onPress={() => toggleMetric(key)}
          >
            <Text style={styles.toggleText}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Text>
            <View style={[styles.statusPill, { backgroundColor: metrics[key] ? '#3B82F6' : '#334155' }]}>
              <Text style={styles.statusPillText}>{metrics[key] ? 'ENABLED' : 'DISABLED'}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Remediation Recommendations ({steps.length})</Text>
        {steps.length === 0 ? (
          <View style={styles.cleanCard}>
            <Text style={styles.cleanText}>✓ No critical vulnerabilities detected.</Text>
          </View>
        ) : (
          steps.map((s) => (
            <View key={s.id} style={styles.remediationCard}>
              <Text style={styles.remediationStep}>ACTION REQUIRED #{s.id}</Text>
              <Text style={styles.remediationAction}>{s.action}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  scroll: { padding: 20 },
  header: { alignItems: 'center', marginBottom: 24, marginTop: 10 },
  appName: { fontSize: 24, fontWeight: '900', color: '#38BDF8', letterSpacing: 2 },
  subTitle: { fontSize: 13, color: '#94A3B8', marginTop: 4 },
  scoreCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 24,
  },
  scoreLabel: { fontSize: 12, color: '#94A3B8', fontWeight: '700', letterSpacing: 1 },
  scoreValue: { fontSize: 56, fontWeight: '900', marginVertical: 8 },
  gradeBadge: { fontSize: 13, fontWeight: '700', color: '#CBD5E1' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#F1F5F9', marginBottom: 12, marginTop: 8 },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  toggleText: { fontSize: 13, color: '#E2E8F0', fontWeight: '600' },
  statusPill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statusPillText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  remediationCard: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  remediationStep: { color: '#F59E0B', fontSize: 11, fontWeight: '700', marginBottom: 4 },
  remediationAction: { color: '#F8FAFC', fontSize: 13, fontWeight: '500' },
  cleanCard: { backgroundColor: '#064E3B', padding: 16, borderRadius: 12 },
  cleanText: { color: '#6EE7B7', fontWeight: '600', fontSize: 13 },
});
