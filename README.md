# 📊 Market Pulse – AI-Powered Stock Sentiment App

Market Pulse is a full-stack Next.js application that predicts whether a stock (e.g., AAPL, TSLA, GOOGL) is **bullish**, **bearish**, or **neutral** for the next trading day using AI-generated insights based on price momentum and news data.

---

## 🔧 Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Frontend**: React, Tailwind CSS, ShadCN UI, Recharts, Framer Motion
- **AI Integration**: Genkit
- **APIs**: Alpha Vantage (stock data), NewsAPI (news), Gemini (via Google AI Studio)
- **Authentication**: Firebase Authentication (Google Sign-In)
- **Deployment**: Firebase App Hosting or Vercel

---

## 🚀 Features

- 📈 **Momentum Analysis**: Calculates score based on the last 5 trading-day returns.
- 📰 **News Analysis**: Fetches the 5 latest headlines from NewsAPI for sentiment context.
- 🧠 **AI-Powered Pulse**: Uses Google's Gemini model via Genkit to determine overall sentiment (bullish, bearish, neutral) and provide a supporting explanation.
- 🎨 **Modern UI**: A clean, responsive, chat-style interface built with ShadCN UI and Recharts.
- 🌗 **Theme Toggle**: Switch between dark and light modes.
- 🔍 **Raw Data Viewer**: An expandable JSON viewer shows the complete data payload from the analysis.
- 🔐 **Secure Sign-In**: Google Sign-In managed by Firebase Authentication.
- 🧭 **Clear Navigation**: Easy access to Home, Dashboard, and About pages.
- ✨ **Animated Interface**: Subtle animations using Framer Motion for a polished user experience.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or later)
- An API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
- An API key from [NewsAPI](https://newsapi.org/)
- An API key from [Google AI Studio](https://aistudio.google.com/) for the Gemini model.

### 📂 Clone the Repository
```bash
git clone https://github.com/your-username/market-pulse.git
cd market-pulse
```

### 📦 Install Dependencies
```bash
npm install
```

### 🔐 Environment Variables
Create a `.env` file in the root of your project and add your API keys.

```env
# .env
# Get your key from https://www.alphavantage.co/support/#api-key
ALPHA_VANTAGE_API_KEY=YOUR_ALPHA_VANTAGE_API_KEY

# Get your key from https://newsapi.org/
NEWS_API_KEY=YOUR_NEWS_API_KEY

# Get your key from https://aistudio.google.com/
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### ▶️ Run the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:9002`.

---

## 📡 API Specification

The application exposes a single REST endpoint for getting stock analysis.

**Endpoint:** `GET /api/v1/market-pulse`

**Query Parameters:**

| Parameter | Type   | Description                      | Required |
| :-------- | :----- | :------------------------------- | :------- |
| `ticker`  | string | The stock ticker symbol to analyze. | Yes      |

**Sample Request (cURL):**

You can test the API endpoint using `curl`. Make sure your development server is running, then execute the following command in your terminal:

```bash
curl "http://localhost:9002/api/v1/market-pulse?ticker=GOOG"
```

**Sample Response:**

```json
{
  "ticker": "GOOG",
  "momentum": {
    "returns": [0.001, 0.005, -0.002, 0.01, 0.003],
    "score": 0.0034
  },
  "news": [
    {
      "title": "Google parent Alphabet posts record profit...",
      "summary": "Alphabet Inc on Tuesday posted a record quarterly profit..."
    }
  ],
  "pulse": "bullish",
  "explanation": "Based on the positive 5-day returns and bullish sentiment in recent news about record profits, the outlook for GOOG is bullish."
}
```

---

## 🧠 Design & Trade-offs

- ✅ **Next.js App Router**: Chosen for its powerful features like Server Components, Server Actions, and simplified routing, which are ideal for building modern, performant web applications.
- ✅ **Genkit for AI Flows**: Genkit provides a structured and extensible way to define AI logic. The use of `tools` within the prompt allows the LLM to fetch real-time data on its own, making the AI flow more agentic and powerful.
- ⚖️ **Free Tier APIs**: Alpha Vantage and NewsAPI were used for their generous free tiers, which are perfect for a proof-of-concept. For a production application, upgrading to a paid, more reliable data source would be a necessary next step.
- 🎨 **ShadCN UI & Tailwind CSS**: This combination allows for rapid development of a modern, professional, and customizable UI without the need to write extensive custom CSS.
- 🔐 **Firebase Authentication**: Provides a secure and easy-to-implement solution for user authentication, including Google Sign-In, which is well-supported and trusted.

---

## 🛤️ Next Steps

- 👤 **User Accounts**: Allow users to save their analyzed stocks and track their portfolio over time.
- 📊 **Advanced Visualizations**: Add more detailed historical price charts, volume data, and technical indicators.
- 🧠 **Dynamic LLM Switching**: Introduce a setting to allow users to switch between different LLMs (e.g., Gemini Pro, Claude, etc.).
- 🚀 **Production Deployment**: Deploy the application using a service like Vercel or Firebase App Hosting for seamless, scalable hosting.
- 📈 **Improved Scoring**: Enhance the momentum scoring algorithm, potentially using weighted averages or other statistical measures.

---

## 🙌 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License
This project is licensed under the MIT License.
