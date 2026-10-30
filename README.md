# ShieldGuard Mobile 📱🛡️

[![React Native](https://img.shields.io/badge/React_Native-0.74.1-blue.svg)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-SDK_51-black.svg)](https://expo.dev)
[![Platforms: Android | iOS | Web](https://img.shields.io/badge/Platforms-Android_%7C_iOS_%7C_Web-success.svg)](#cross-platform-support)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Production-ready cross-platform mobile security & privacy posture auditor built with React Native and Expo.

---

## 📱 Mobile UI Architecture

```
┌──────────────────────────────────────────────┐
│                 SHIELDGUARD                  │
│       Mobile Privacy & Security Auditor      │
├──────────────────────────────────────────────┤
│                                              │
│          DEVICE SECURITY POSTURE             │
│                  85/100                      │
│            GRADE: B • MODERATE               │
│                                              │
├──────────────────────────────────────────────┤
│  Live Telemetry Checks:                      │
│  [ CAMERA ACCESS ]               DISABLED    │
│  [ MICROPHONE AUDIT ]            DISABLED    │
│  [ PRECISE GPS TELEMETRY ]       ENABLED     │
│  [ BIOMETRIC SCREEN LOCK ]       ACTIVE      │
├──────────────────────────────────────────────┤
│  Remediation Actions Required (1):           │
│  • Restrict background GPS telemetry         │
└──────────────────────────────────────────────┘
```

---

## ⚡ Features

- **Real-Time Security Posture Scoring:** Dynamically evaluates device vulnerabilities and outputs a weighted 0-100 score and letter grade (A+ to D).
- **Critical Permission Auditing:** Scans sensitive runtime permissions including camera, microphone, continuous location, and sideloaded app installations.
- **Actionable Remediation Guidance:** Automatically generates targeted steps to harden Android & iOS device settings.
- **Cross-Platform Compatibility:** Runs seamlessly on Android devices, iPhones (iOS), and progressive web browsers (PWA).
- **High-Performance Dark Mode Theme:** Custom UI engineered with Tailwind-style slate color palettes for battery efficiency on OLED screens.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Test Suite
```bash
npm test
```

### 3. Start Expo Dev Server
```bash
npm start
```
- Press `a` to open in Android Emulator / Device.
- Press `i` to open in iOS Simulator.
- Press `w` to open in Web Browser.

---

## 📜 License
MIT License. Created by [Z-Brains](https://github.com/zbrainsofficial).
