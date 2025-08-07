'use server';

import { analyzeStockData } from "@/ai/flows/analyze-stock-data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const ticker = req.nextUrl.searchParams.get('ticker');

  if (!ticker) {
    return NextResponse.json({ error: 'Ticker query parameter is required' }, { status: 400 });
  }

  try {
    const result = await analyzeStockData({ ticker });
    return NextResponse.json(result);
  } catch (error) {
    console.error(`Error analyzing stock for ${ticker}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: `Failed to get stock analysis: ${errorMessage}` }, { status: 500 });
  }
}
