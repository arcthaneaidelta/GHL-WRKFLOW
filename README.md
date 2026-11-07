# GHL Command Center
### Enterprise GoHighLevel Automation & Operations Ecosystem

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

An enterprise-grade GoHighLevel automation and operations management platform demonstrating multi-subaccount governance, visual workflow building, sales funnel operations, international telecom routing, webhook failure recovery, and real-time operational telemetry.

---

## 🚀 Live Demo & Hosting

This project is built as a production-ready, client-side React + TypeScript application configured for zero-configuration hosting on **Netlify**, **Vercel**, or any static site provider.

### Automated Netlify Configuration
- `netlify.toml` is pre-configured with SPA route rewrites (`/* -> /index.html 200`), security headers, asset caching, and Node.js build settings.
- `public/_redirects` ensures seamless browser history navigation across all deep routes (`/app`, `/app/workflows`, `/app/carts`, `/app/payments`, etc.).

---

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS (Custom Dark Forest Green enterprise design system)
- **State Management:** Zustand (Centralized reactive state across all modules)
- **Analytics & Charts:** Recharts
- **Icons:** Lucide React
- **Routing:** React Router v6

---

## ⚡ Key Features

- **Public Landing Page:** Interactive network visual, layered architecture tabs, ecosystem map, and verified consultation request modal.
- **Cinematic Loading Experience:** 2-second geometric node initialization sequence.
- **Visual Workflow Builder:** Node-based editor with conditional branching and step-by-step test execution simulation.
- **5 Interactive Proof Scenarios:**
  - *Scenario A:* Abandoned Cart Recovery Sequence
  - *Scenario B:* Payment Failure & Smart Dunning
  - *Scenario C:* International SMS Carrier Fallback Routing
  - *Scenario D:* Webhook Timeout Replay & Recovery
  - *Scenario E:* Execution Trace & Node Troubleshooting
- **Sales Funnel Operations:** Multi-step conversion waterfall analytics & live customer checkout preview.
- **1-Click Upsell / Downsell Engine:** Post-purchase decision trees with tokenized charges.
- **Executive Consultation Calendar:** Round-robin schedule with automated no-show rescue.
- **Integration Hub & API Inspector:** 12 enterprise integrations with packet inspection & cURL snippets.
- **Real CSV Export Engine:** Client-side generation of real `.csv` reports for transactions, workflows, and cart recovery.
- **System Health Sentinel & Incident Command:** Subsystem uptime monitoring with root-cause isolation.
- **Global Command Palette:** Quick navigation via `Ctrl + K`.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📦 Deployment to Netlify

### Option 1: Git Integration (Recommended)
1. Push this repository to GitHub.
2. In Netlify, click **Add new site** > **Import an existing project**.
3. Select your GitHub repository (`GHL-WRKFLOW`).
4. Netlify will auto-detect settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**.

### Option 2: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod
```
