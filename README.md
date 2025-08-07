# 📊 Market Pulse – AI-Powered Stock Sentiment App

Market Pulse is a full-stack application that predicts whether a stock (e.g., AAPL, TSLA, GOOGL) is **bullish**, **bearish**, or **neutral** for the next trading day using AI-generated insights based on price momentum and news data.

---

## 🔧 Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS + ShadCN UI
- **Backend**: FastAPI (Python)
- **APIs**: Alpha Vantage, NewsAPI, Gemini (via Google AI Studio)
- **Auth**: Firebase Authentication (Google Sign-In)
- **Deployment**: Firebase Hosting (frontend), Railway/Render (backend)

---

## 🚀 Features

- 📈 Momentum analysis based on last 5 trading-day returns
- 📰 Latest 5 headlines from NewsAPI
- 🧠 Gemini-powered LLM to determine sentiment
- 🟢 Chat-style React UI with dark/light theme toggle
- 🔍 Expandable JSON viewer for full analysis
- 🔐 Google Sign-In authentication
- 📉 Recharts sparkline for price trends
- 🧭 Navigation with Home, Sign In, About, and Analysis sections
- ✨ Subtle animations for interactive UI

---

## 🛠️ Getting Started

### 📂 Clone the Repository
```bash
git clone https://github.com/yourname/market-pulse.git
cd market-pulse
```

### 🧪 Backend Setup (FastAPI)
```bash
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 🌐 Frontend Setup (React)
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables
Create a `.env` file in the `backend/` folder:
```env
ALPHA_VANTAGE_API_KEY=your_alpha_key
NEWS_API_KEY=your_news_key
GEMINI_API_KEY=your_gemini_key
```

For frontend (if using env vars):
```env
VITE_API_URL=https://your-backend-url.com
```

---

## 📡 API Specification

### ✅ Endpoint
```
GET /api/v1/market-pulse?ticker=MSFT
```

### 📄 Sample curl Request
```bash
curl http://localhost:8000/api/v1/market-pulse?ticker=MSFT
```

### 📦 Sample Response
```json
{
  "ticker": "MSFT",
  "as_of": "2025-08-07",
  "momentum": {
    "returns": [-0.3, 0.4, 1.1, -0.2, 0.7],
    "score": 0.34
  },
  "news": [
    { "title": "Microsoft launches new AI chip", "description": "...", "url": "..." }
  ],
  "pulse": "bullish",
  "llm_explanation": "Momentum is moderately positive..."
}
```

---

## 🧪 Testing

### Backend:
```bash
pytest backend/tests/
```

### Frontend:
```bash
npm run test
```

---

## ⚙️ Deployment

### 🚀 Frontend (Firebase Hosting)
```bash
npm run build
firebase login
firebase init
firebase deploy
```

### 🚀 Backend (Railway / Render)
- Connect GitHub repo
- Set environment variables
- Deploy FastAPI with Uvicorn

---

## 🧠 Design & Trade-offs

- ✅ **Server Components** via Next.js for better SSR
- ✅ Used `Genkit` for composable AI flows
- ⚖️ Trade-off: Free-tier APIs limit frequency and accuracy
- 🧠 External tools fetch data in real time within prompts
- 🧰 Sparkline charts use `Recharts`
- 💡 Cards styled with `ShadCN` and animated via `Framer Motion`
- 🚀 Google Auth via Firebase for secure sign-in

---

## 🛤️ Next Steps

- 🔐 Add user accounts to track ticker history
- 📊 More technical indicators & trend visualizations
- 🧠 Allow switching LLMs dynamically
- 🌐 Production deployment on Vercel/Railway
- 📈 Improve momentum scoring using weighted averages

---

## 🙌 Contributing
Pull requests welcome! Please open issues first to discuss major changes.

---

## 📜 License
MIT © 2025 Jerrin Joejoe
