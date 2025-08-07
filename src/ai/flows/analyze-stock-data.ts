'use server';

/**
 * @fileOverview Provides a Genkit flow to analyze stock data and generate a sample result card.
 *
 * - analyzeStockData - A function that analyzes stock data and returns a sample result.
 * - AnalyzeStockDataInput - The input type for the analyzeStockData function.
 * - AnalyzeStockDataOutput - The return type for the analyzeStockData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getStockMomentum, getStockNews, MomentumSchema, NewsArticleSchema } from '@/services/alpha-vantage';

const AnalyzeStockDataInputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock to analyze.'),
});
export type AnalyzeStockDataInput = z.infer<typeof AnalyzeStockDataInputSchema>;

const AnalyzeStockDataOutputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock.'),
  momentum: MomentumSchema.describe('The momentum data, including 5-day returns and a score.'),
  news: z.array(NewsArticleSchema).describe('The 5 latest news headlines.'),
  pulse: z.enum(['bullish', 'bearish', 'neutral']).describe('The AI-driven pulse indicator.'),
  explanation: z.string().describe('An AI-generated explanation of the stock\'s pulse based on news and momentum data.'),
});
export type AnalyzeStockDataOutput = z.infer<typeof AnalyzeStockDataOutputSchema>;

export async function analyzeStockData(input: AnalyzeStockDataInput): Promise<AnalyzeStockDataOutput> {
  return analyzeStockDataFlow(input);
}

const momentumTool = ai.defineTool(
    {
      name: 'getStockMomentum',
      description: 'Fetches the recent price momentum for a given stock ticker, including 5-day returns and a momentum score.',
      inputSchema: z.object({ ticker: z.string() }),
      outputSchema: MomentumSchema,
    },
    async (input) => getStockMomentum(input.ticker)
);

const newsTool = ai.defineTool(
    {
        name: 'getStockNews',
        description: 'Fetches the 5 latest news headlines for a given stock ticker.',
        inputSchema: z.object({ ticker: z.string() }),
        outputSchema: z.array(NewsArticleSchema),
    },
    async (input) => getStockNews(input.ticker)
);

const analyzeStockDataPrompt = ai.definePrompt({
  name: 'analyzeStockDataPrompt',
  tools: [momentumTool, newsTool],
  input: {schema: AnalyzeStockDataInputSchema},
  output: {schema: AnalyzeStockDataOutputSchema},
  prompt: `You are a financial analyst. Your task is to analyze the provided stock data for the ticker symbol {{{ticker}}} and determine if its outlook is bullish, bearish, or neutral.

You must use the provided tools to fetch the latest price momentum and news headlines for the ticker.

Based on the fetched momentum data (5-day returns and overall score) and the sentiment from the news headlines, provide:
1.  The overall "pulse" of the stock (bullish, bearish, or neutral).
2.  A brief explanation for your decision, referencing specific data points from the momentum and news context.
3.  The raw momentum and news data you fetched.`,
});

const analyzeStockDataFlow = ai.defineFlow(
  {
    name: 'analyzeStockDataFlow',
    inputSchema: AnalyzeStockDataInputSchema,
    outputSchema: AnalyzeStockDataOutputSchema,
  },
  async input => {
    const {output} = await analyzeStockDataPrompt(input);
    return output!;
  }
);
