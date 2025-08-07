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

const AnalyzeStockDataInputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock to analyze.'),
});
export type AnalyzeStockDataInput = z.infer<typeof AnalyzeStockDataInputSchema>;

const AnalyzeStockDataOutputSchema = z.object({
  ticker: z.string().describe('The ticker symbol of the stock.'),
  momentumScore: z.number().describe('A score representing the stock\'s momentum.'),
  pulse: z.enum(['bullish', 'bearish', 'neutral']).describe('The AI-driven pulse indicator.'),
  explanation: z.string().describe('An AI-generated explanation of the stock\'s pulse based on news and momentum data.'),
});
export type AnalyzeStockDataOutput = z.infer<typeof AnalyzeStockDataOutputSchema>;

export async function analyzeStockData(input: AnalyzeStockDataInput): Promise<AnalyzeStockDataOutput> {
  return analyzeStockDataFlow(input);
}

const analyzeStockDataPrompt = ai.definePrompt({
  name: 'analyzeStockDataPrompt',
  input: {schema: AnalyzeStockDataInputSchema},
  output: {schema: AnalyzeStockDataOutputSchema},
  prompt: `Analyze the stock data for the ticker symbol {{{ticker}}}. Based on recent news and momentum data, determine the overall pulse of the stock (bullish, bearish, or neutral) and provide a brief explanation.

Output:
Ticker: {{ticker}}
Momentum Score: (Generate a representative momentum score, e.g., 75)
Pulse: (bullish, bearish, or neutral)
Explanation: (AI-generated explanation based on news and momentum data)`,  
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
