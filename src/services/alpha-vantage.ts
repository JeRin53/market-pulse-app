/**
 * @fileOverview Service for fetching data from the Alpha Vantage API.
 * This service is used to get stock prices and news for a given ticker.
 * It requires an API key to be set in the environment variables.
 */

import {z} from 'zod';

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

const TimeSeriesEntrySchema = z.object({
  '1. open': z.string(),
  '2. high': z.string(),
  '3. low': z.string(),
  '4. close': z.string(),
  '5. volume': z.string(),
});

const AlphaVantageApiResponseSchema = z.object({
  'Time Series (Daily)': z.record(TimeSeriesEntrySchema),
});

export const MomentumSchema = z.object({
  returns: z.array(z.number()),
  score: z.number(),
});
export type Momentum = z.infer<typeof MomentumSchema>;


/**
 * Calculates the momentum for a given stock ticker.
 * @param prices - An array of daily closing prices.
 * @returns The calculated momentum data.
 */
function calculateMomentum(prices: number[]): Momentum {
  if (prices.length < 2) {
    return {returns: [], score: 0};
  }
  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i-1]) / prices[i-1]);
  }
  
  const score = returns.reduce((acc, r) => acc + r, 0) / returns.length;

  return {
    returns: returns.slice(-5).map(r => parseFloat(r.toFixed(4))),
    score: parseFloat(score.toFixed(4)),
  };
}

/**
 * Fetches the daily prices for a given stock ticker from Alpha Vantage.
 * @param ticker - The stock ticker symbol.
 * @returns The momentum data for the stock.
 */
export async function getStockMomentum(ticker: string): Promise<Momentum> {
  if (!API_KEY) {
    throw new Error('ALPHA_VANTAGE_API_KEY is not set.');
  }

  const url = `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch stock prices for ${ticker}`);
  }

  const data = await response.json();
  const parsed = AlphaVantageApiResponseSchema.safeParse(data);

  if (!parsed.success) {
    if (data.Information) {
      throw new Error(`Alpha Vantage API Error: ${data.Information}`);
    }
    throw new Error('Failed to parse stock price data from Alpha Vantage.');
  }

  const timeSeries = parsed.data['Time Series (Daily)'];
  const dates = Object.keys(timeSeries).sort().reverse();
  const recentPrices = dates.slice(0, 6).map(date => parseFloat(timeSeries[date]['4. close']));

  return calculateMomentum(recentPrices.reverse());
}

export const NewsArticleSchema = z.object({
    title: z.string(),
    summary: z.string(),
    url: z.string().optional(),
});
export type NewsArticle = z.infer<typeof NewsArticleSchema>;

const AlphaVantageNewsItemSchema = z.object({
    title: z.string(),
    summary: z.string(),
    url: z.string(),
});
  
const AlphaVantageNewsResponseSchema = z.object({
    feed: z.array(AlphaVantageNewsItemSchema),
});

/**
 * Fetches the latest news for a given stock ticker from Alpha Vantage.
 * @param ticker - The stock ticker symbol.
 * @returns An array of news articles.
 */
export async function getStockNews(ticker: string): Promise<NewsArticle[]> {
    if (!API_KEY) {
        throw new Error('ALPHA_VANTAGE_API_KEY is not set.');
    }
    const url = `${BASE_URL}?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch stock news for ${ticker}`);
    }

    const data = await response.json();

    if (data.Information) {
        throw new Error(`Alpha Vantage API Error: ${data.Information}`);
    }

    const parsed = AlphaVantageNewsResponseSchema.safeParse(data);

    if (!parsed.success) {
        return [];
    }

    return parsed.data.feed.slice(0, 5).map(item => ({
        title: item.title,
        summary: item.summary,
        url: item.url,
    }));
}