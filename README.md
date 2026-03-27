# drug_conflict_analyzer
# 💊 PharmaSafe

> **Check drug-drug interactions before they check you.**

PharmaSafe is a patient-facing web application that lets users input their current medications and personal health profile to instantly check for potential drug-drug interactions. It surfaces risk severity, explains consequences in plain language, suggests safer alternatives, and visualizes interaction data — all without storing any personal data.

---

## 🌐 Live Demo

> _Coming soon — deployment in progress_

---

## 📸 Screenshots

> _UI screenshots will be added post-MVP_

---

## ✨ Features

### 👤 Personal Health Profile
- Input weight, height, gender, and age
- Profile is used to contextualize risk (e.g., kidney function estimates, pediatric/geriatric flags)
- **Zero data persistence** — all inputs are session-only and never stored

### 💊 Drug Interaction Checker
- Input 2 or more medications (brand or generic name)
- Supports prescription + OTC drugs
- Checks compatibility based on pharmacokinetic and pharmacodynamic interactions
- Auto-complete powered by drug name search

### 🚨 Risk Severity Display
- Color-coded severity tiers: **Safe / Mild / Moderate / Severe / Contraindicated**
- Plain-English explanation of *why* the interaction is dangerous
- Patient-specific risk flagging (e.g., "Not safe if you have kidney disease", "Not recommended for patients over 65")
- Symptom preview: what to watch out for if interaction occurs

### 🔄 Alternatives & Suggestions
- Substitute medication recommendations when an interaction is found
- Dosage adjustment guidance
- Time-interval staggering suggestions (e.g., "Take Drug A 4 hours before Drug B")
- Notes on which alternatives require a prescription vs. OTC

### 📊 Interaction Visualization
- Severity comparison charts (bar/radar)
- Drug interaction network graph (multi-drug view)
- Side-effect probability indicators
- Risk timeline visualization

### 🔐 Security & Privacy
- No personal data stored — all computations happen per-request
- HTTPS enforced on all endpoints
- Strict input validation and sanitization (no injection vectors)
- Prominent medical disclaimer on all result pages
- No accounts, no tracking, no cookies beyond session

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| **Backend** | Python 3.11+, FastAPI |
| **Drug Data API** | _Placeholder — see [Drug Database](#-drug-database-integration)_ |
| **Charts** | Recharts / D3.js |
| **Deployment** | Vercel (Frontend), Railway / Render (Backend) |
| **Validation** | Zod (Frontend), Pydantic (Backend) |

---

## 🗂 Project Structure

```
pharmasafe/
├── frontend/                    # Next.js application
│   ├── src/
│   │   ├── webapplication/
│   │   │   ├── layout.tsx       # Root layout with disclaimer banner
│   │   │   ├── page.tsx         # Landing page
│   │   │   ├── check/
│   │   │   │   └── page.tsx     # Drug + patient input page
│   │   │   └── results/
│   │   │       └── page.tsx     # Interaction results page
│   │   ├── components/
│   │   │   ├── DrugInputForm.tsx       # Multi-drug input with autocomplete
│   │   │   ├── PatientInfoForm.tsx     # Age/weight/height/gender form
│   │   │   ├── RiskCard.tsx            # Severity display card
│   │   │   ├── InteractionChart.tsx    # Chart visualizations
│   │   │   ├── AlternativesPanel.tsx   # Suggestions panel
│   │   │   └── Disclaimer.tsx          # Medical disclaimer modal/banner
│   │   └── lib/
│   │       ├── api.ts           # API client for FastAPI backend
│   │       └── validators.ts    # Frontend input validation (Zod)
│   ├── package.json
│   ├── next.config.js
│   └── tailwind.config.js
│
├── backend/                     # FastAPI application
│   ├── main.py                  # website entrypoint
│   ├── app/
│   │   ├── models/
│   │   │   ├── patient.py       # Patient profile Pydantic model
│   │   │   └── drug.py          # Drug and interaction Pydantic models
│   │   ├── routers/
│   │   │   ├── interactions.py  # POST /interactions/check
│   │   │   └── drugs.py         # GET /drugs/search
│   │   ├── services/
│   │   │   ├── interaction_service.py   # Core interaction logic
│   │   │   └── drug_db_service.py       # Drug database adapter
│   │   └── utils/
│   │       ├── validators.py    # Input sanitization
│   │       └── risk_scorer.py   # Risk severity scoring logic
│   └── requirements.txt
│
├── docs/
│   ├── architecture.md          # System design overview
│   ├── api-reference.md         # API endpoint documentation
│   └── drug-db-integration.md   # Guide for plugging in drug APIs
│
├── .github/
│   └── workflows/
│       └── ci.yml               # CI pipeline (lint + test)
│
├── .env.example
├── .gitignore
└── README.md
```

---


## 🩺 Medical Disclaimer

> PharmaSafe provides **educational and informational content only**. It is **not a substitute for professional medical advice**, diagnosis, or treatment. Always consult your doctor, pharmacist, or qualified healthcare provider before making any changes to your medication. Never disregard professional medical advice because of something you read on this platform.

---

## 🗺 Roadmap

- [ ] MVP: Single drug pair interaction check
- [ ] Multi-drug interaction graph (3+ drugs)
- [ ] Condition-specific risk profiles
- [ ] PDF report export (session-only, no storage)
- [ ] Multilingual support (Hindi priority)
- [ ] Pharmacist-facing mode (detailed clinical view)
- [ ] Integration with RxNorm + OpenFDA as default free tier

---

## 🤝 Contributing

Contributions are welcome! Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a PR.

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push and open a Pull Request

---


---

## 👥 Team

Built with care by the PharmaSafe team.

---

_PharmaSafe is not a licensed medical service. All interaction data is sourced from publicly available pharmaceutical databases and is provided for informational purposes only._
