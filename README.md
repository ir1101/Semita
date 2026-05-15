# Semita

> **One quiet path for everything your neighbourhood depends on.**

Semita is a sophisticated, minimalist, mobile-first prototype for a unified community management platform for residential neighbourhoods. It consolidates the chaos of scattered WhatsApp groups into a single, verified, real-time dashboard for electricity, water, garbage, security, maintenance and more.

This repository contains a **hi-fi interactive prototype** built as a single-page React + Babel application, designed to run inside an iOS device frame for presentation.

---

## Highlights

- **Quiet-luxury design system** — Instrument Serif display + Geist sans, warm charcoal palette, brass accent
- **Light & dark mode** with persisted preference
- **Full auth flow** — splash → onboarding carousel → phone + OTP → verified
- **5-tab mobile shell** with a center FAB for "Report an issue"
- **Live data feel** — countdowns, pulsing dots, animated bars, slide-up cards
- **State persists** across reloads via `localStorage` (auth stage, tab, paid bills)
- **In-design "Tweaks" panel** for live theme switching

---

##  Screens

| Area | What's inside |
|---|---|
| **Splash + Onboarding** | Animated rings, 3-card story (Services · Verified · Insights) |
| **Login** | Indian phone format, 4-digit OTP, verified-resident confirmation |
| **Home** | Live outage hero w/ ETA countdown, 6-service grid, monthly insights peek, week-ahead row |
| **Pulse** | Verified-only alerts feed with category filters, community tiles |
| **Wallet** | Outstanding total, itemised bills, year-to-date bar chart, working "Pay all · UPI" |
| **Me** | Identity card, society shortcuts, appearance, notifications, help |
| **Service detail** | Live status hero, timeline w/ signed events, resident comments |
| **Report** | 5-step flow — Category → Details → Photo → Location → Review → Confirmation w/ ticket # |
| **Insights** | Avg response, resolved %, uptime, donut by category, monthly water + power |
| **Directory** | Alpha-grouped, block filter, search, verified badges |
| **Maintenance** | Week strip + cards, live event highlighting |
| **Security** | Day stats (visitors / vehicles / incidents) + live log |
| **Polls** | Animated vote-and-reveal with running totals |
| **Lost & found** | Lost / Found tabs, gallery cards |
| **Sustainability** | Consumption ring, 7-day trend, power + waste tiles, society-wide tip |
| **Outage heatmap** | Interactive flat-by-flat grid across 4 towers × 18 floors |

---

##  Run it locally

Because the prototype loads JSX files separately (via Babel standalone), **you cannot double-click `Semita.html`** — browsers block `file://` from fetching `.jsx`. You need a tiny local server.

### Option 1 — Python (easiest, preinstalled on Mac & Linux)

```bash
cd path/to/semita
python3 -m http.server 8000
```

Open <http://localhost:8000/Semita.html>

### Option 2 — Node

```bash
npx serve .
```

### Option 3 — VS Code

Install the **Live Server** extension → right-click `Semita.html` → *Open with Live Server*.

---

##  Project structure

```
.
├── Semita.html           # Entry point — loads fonts, React, Babel, all scripts
├── styles.css            # Design tokens, components, animations
├── data.js               # Mock data (services, alerts, residents, bills, …)
├── icons.jsx             # Line-icon set (1.5px stroke, currentColor)
├── ios-frame.jsx         # iOS 26 device frame (status bar, dynamic island, etc.)
├── tweaks-panel.jsx      # Tweaks panel shell + form controls
├── onboarding.jsx        # Splash, Onboarding, Login
├── screens-main.jsx      # Home, Pulse, Wallet, Me (5-tab content)
├── screens-detail.jsx    # All detail sheets (service, report, insights, …)
└── app.jsx               # App shell, routing, tab bar, theme, persistence
```

All UI is React (via `react@18.3.1` UMD) transpiled in the browser by `@babel/standalone@7.29.0`. No build step, no install.

---

##  Design system

**Type**

- *Display & numerals* — Instrument Serif (Google Fonts)
- *Body & UI* — Geist
- *Mono / data* — Geist Mono

**Palette (dark)**

- Background `#0E0C0A` · Surface `#181513` · Text `#F2EBE0`
- Accent (brass) `#C7AB7C`
- Good `#8FB29A` · Warn `#D9B074` · Bad `#C68576` · Info `#8FA6B2`

**Palette (light)**

- Background `#EFE9DD` · Surface `#F8F3E9` · Text `#1B1814`
- Accent `#8A6D44`

All colors live as CSS variables in `styles.css` — flip `data-theme` on `<html>` to switch.

---

## Demo notes

- **OTP** — tap any 4 digits to advance
- **Pay all · UPI** — settles all dues; click *Reset prototype state* in Tweaks to bring them back
- **Outage hero** — the countdown decrements live each second
- **Polls** — once you vote, percentages animate in and stay locked
- **Theme** — change from the *Me* tab or from the Tweaks panel; persists across reloads

---

##  Where it could go

This is a frontend prototype with `localStorage`-backed state, intentionally scoped so the full demo runs offline. To make it real, you'd swap the mock data in `data.js` for API calls and add:

- A backend (issue tickets, polls, bills, residents, RWA roles)
- Auth (phone OTP via Twilio / MSG91)
- Real-time channel for verified alerts (WebSocket / SSE)
- Payments (Razorpay / UPI intent)
- Push notifications
- Admin app for the manager / committee
