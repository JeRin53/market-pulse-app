'use server';

import { z } from 'zod';
import { analyzeStockData, type AnalyzeStockDataOutput } from '@/ai/flows/analyze-stock-data';

const TickerSchema = z.string().trim().min(1, "Ticker is required").max(10, "Ticker is too long").toUpperCase();

export type FormState = {
  message: string;
  data?: AnalyzeStockDataOutput;
  success: boolean;
};

export async function getStockAnalysis(prevState: FormState, formData: FormData): Promise<FormState> {
  const ticker = formData.get('ticker');
  
  const validatedTicker = TickerSchema.safeParse(ticker);

  if (!validatedTicker.success) {
    return {
      message: validatedTicker.error.errors[0].message,
      success: false,
    };
  }

  try {
    const result = await analyzeStockData({ ticker: validatedTicker.data });
    return {
      message: 'Analysis successful.',
      data: result,
      success: true
    };
  } catch (error) {
    console.error("Stock analysis failed:", error);
    return {
      message: error instanceof Error ? `An error occurred: ${error.message}` : "An unknown error occurred during analysis.",
      success: false
    };
  }
}
