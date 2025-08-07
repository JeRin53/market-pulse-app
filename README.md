# Market Pulse: AI-Powered Stock Analysis

This is a Next.js application built with Firebase Studio that provides AI-driven analysis for stock tickers. It uses Genkit to create a flow that fetches real-time news and momentum data, then uses a Large Language Model (LLM) to determine a "pulse" (bullish, bearish, or neutral) and provide a supporting explanation.

## Features

-   **AI Analysis**: Enter a stock ticker and get an instant market pulse.
-   **REST API**: Exposes a `GET /api/v1/market-pulse` endpoint for programmatic access.
-   **Data-Driven Insights**: Analysis is based on the latest financial news and 5-day price momentum.
-   **Real-time Data**: Utilizes the Alpha Vantage API for price data and NewsAPI for news.
-   **Clear UI**: Built with Next.js, React, ShadCN UI, and Tailwind CSS for a clean and responsive user experience.
-   **Extensible AI Flows**: Powered by Genkit, allowing for easy modification and extension of the AI logic.
-   **In-Memory Caching**: Reduces redundant API calls with a 10-minute in-memory cache for stock data.

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   An API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
-   An API key from [NewsAPI](https://newsapi.org/)
-   An API key from [Google AI Studio](https://aistudio.google.com/) for the Gemini model.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your API keys.

    ```env
    # .env
    # Get your key from https://www.alphavantage.co/support/#api-key
    ALPHA_VANTAGE_API_KEY=YOUR_ALPHA_VANTAGE_API_KEY

    # Get your key from https://newsapi.org/
    NEWS_API_KEY=YOUR_NEWS_API_KEY

    # Get your key from https://aistudio.google.com/
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

### API Specification

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

## Design and Trade-offs

-   **Framework**: Next.js was chosen for its powerful features like Server Components, Server Actions, and easy routing, which are well-suited for this type of application.
-   **AI Integration**: Genkit provides a structured way to define and manage AI flows, making it easy to integrate with different models and tools. Using tools within the prompt allows the LLM to fetch data dynamically as needed.
-   **External APIs**: Alpha Vantage was used for its free tier and comprehensive stock data. NewsAPI was used for up-to-date news. A paid, more robust data source would be a good next step for a production application.
-   **Styling**: ShadCN UI and Tailwind CSS were used to quickly build a modern and professional-looking UI without writing custom CSS from scratch.
-   **State Management**: State is managed with a combination of `useState`, `useEffect`, and Next.js Server Actions with `useFormState`. This keeps the client-side logic simple and leverages the power of the server for data fetching and mutations.

## Next Steps

-   **Add user accounts**: Allow users to save their analyzed stocks and track their portfolio.
-   **More advanced charts**: Add more detailed historical price charts and technical indicators.
-   **Deploy to production**: Use a service like Firebase App Hosting or Vercel for easy deployment.
-   **Expand Data Sources**: Integrate additional financial data sources for more robust analysis.
