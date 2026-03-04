# Niche Research Tool

A self-hosted, full-stack tool for B2B founders doing cold outreach research to identify the best vertical for an AI agent startup.

## What it does

- Stores **20 pre-selected B2B niches** (trades, legal, recruitment, property management, accounting, logistics, insurance, healthcare admin, education, construction, manufacturing, retail ops, hospitality, marketing agencies, financial advisors, event management, security firms, cleaning companies, dental/medical practices, freight/customs brokers)
- Each niche has **3 cold outreach templates** — a LinkedIn connection request, a LinkedIn DM, and a cold email — written to surface pain points, not pitch a product
- **Tracks outreach sent** and **responses received** per niche
- Lets you **tag responses** with pain point categories (Time/Efficiency, Cost/Revenue, Compliance/Legal, Staff/HR, Technology/Integration, Customer Management, Reporting/Analytics, Communication, Scheduling/Booking, Cash Flow, Admin Overload, Other)
- Shows a **signal score** (0–100) per niche based on response rate + pain point diversity
- **Dashboard** showing niche leaderboard, global pain point frequency, and top signals
- **Export** your full dataset to CSV or JSON at any time

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (dark mode, minimal design)
- **Local JSON files** for storage (no database setup needed)
- **TypeScript** throughout

## Setup & Running

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
cd saas-market
npm install
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Data is stored automatically in the `data/` directory as JSON files. No database or environment variables needed.

## How to Use

### Step 1 — Pick a niche

From the dashboard, click any niche card to open its detail page.

### Step 2 — Personalise a template

At the top of the niche page, enter a contact name and company to pre-fill the templates. Click **Copy** to copy the filled template to your clipboard.

### Step 3 — Send outreach

Send the message via LinkedIn or email. Then click **+ Log Outreach** to record it:
- Enter the contact's name, company, and title
- Select the channel (LinkedIn Connect / LinkedIn DM / Cold Email)
- Optionally note which template you used

### Step 4 — Log responses

When someone replies, click **+ Log Response**:
- Paste or summarise what they said
- Rate the sentiment (Positive / Neutral / Negative)
- Tag the pain points they mentioned (select all that apply)
- Add any internal notes

### Step 5 — Watch the signal scores

The signal score per niche updates in real time:
- **0–14**: No data yet
- **15–39**: Weak signal
- **40–69**: Moderate signal
- **70–100**: Strong signal

Signal score = (response rate × 60%) + (pain point diversity × 40%), capped at 100.

### Step 6 — Export when ready

Use the **Export CSV** or **Export JSON** buttons in the nav bar to download your full dataset, including all niche scores, outreach records, and responses.

## Signal Score Formula

```
signal_score = (response_rate * 0.6) + (min(unique_pain_point_categories * 5, 40))
```

- **Response rate**: responses ÷ outreach sent (0–100%)
- **Pain point diversity**: each unique pain point category tagged adds 5 points, up to 40 max
- Score is capped at 100

## File Structure

```
src/
├── app/
│   ├── page.tsx                   # Dashboard
│   ├── layout.tsx                 # Root layout with nav
│   ├── globals.css
│   ├── niches/[id]/
│   │   ├── page.tsx               # Niche detail (server component)
│   │   └── NicheDetailClient.tsx  # Niche detail (client interactions)
│   └── api/
│       ├── niches/route.ts        # GET all niches
│       ├── niches/[id]/route.ts   # GET single niche with data
│       ├── outreach/route.ts      # GET/POST/DELETE outreach
│       ├── responses/route.ts     # GET/POST responses
│       ├── responses/[id]/route.ts # PATCH/DELETE response
│       ├── stats/route.ts         # GET global stats
│       └── export/route.ts        # GET CSV or JSON export
├── components/
│   ├── NicheCard.tsx
│   ├── StatCard.tsx
│   ├── SignalBar.tsx
│   ├── PainPointBadge.tsx
│   ├── TemplateCard.tsx
│   ├── LogOutreachModal.tsx
│   ├── LogResponseModal.tsx
│   └── ResponseCard.tsx
└── lib/
    ├── types.ts                   # TypeScript types
    ├── niches-data.ts             # All 20 niches + 60 templates
    └── db.ts                      # JSON file read/write helpers

data/                              # Created automatically on first run
├── outreach.json
└── responses.json
```

## Pain Point Categories

| Category | Description |
|---|---|
| Time / Efficiency | Tasks that take too long or require too many steps |
| Cost / Revenue | Spending too much, or leaving money on the table |
| Compliance / Legal | Regulatory burden, licensing, documentation |
| Staff / HR | Hiring, rostering, retention, no-shows |
| Technology / Integration | Software that doesn't work well or doesn't connect |
| Customer Management | CRM gaps, churn, communication failures |
| Reporting / Analytics | Can't see what's happening in the business |
| Communication | Internal or external communication breakdowns |
| Scheduling / Booking | Appointment management, no-shows, conflicts |
| Cash Flow | Late payments, invoicing delays, working capital |
| Admin Overload | Volume of manual admin tasks |
| Other | Anything else worth noting |

## Tips for Effective Outreach Research

1. **Aim for 10–20 outreach per niche** before drawing conclusions
2. **Don't pitch** — the templates are designed to make people feel safe sharing problems
3. **Tag pain points immediately** after logging a response, while the context is fresh
4. **Look for patterns**, not individual data points — a pain point that comes up 3+ times is a real signal
5. **Prioritise niches** where people respond AND express frustration — that's where the money is
6. **Response rate alone isn't the signal** — a 5% response rate with 10 people all mentioning the same pain is better than a 20% rate with vague replies
