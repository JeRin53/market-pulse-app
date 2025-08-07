'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { getStockAnalysis, type FormState } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AnalysisResultCard } from '@/components/analysis-result-card';
import type { AnalyzeStockDataOutput } from '@/ai/flows/analyze-stock-data';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const initialState: FormState = {
  message: '',
  success: false,
};

const sampleResult: AnalyzeStockDataOutput = {
  ticker: 'SMPL',
  momentumScore: 82,
  pulse: 'bullish',
  explanation: 'This is a sample analysis. The stock shows strong positive momentum based on recent market trends and positive news coverage regarding its upcoming product launch. The overall sentiment is optimistic among analysts.',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full shrink-0 md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : 'Analyze'}
    </Button>
  );
}

export default function StockAnalyzer() {
  const [state, formAction] = useFormState(getStockAnalysis, initialState);
  const { toast } = useToast();
  const [result, setResult] = useState<AnalyzeStockDataOutput | null>(sampleResult);
  const [showSample, setShowSample] = useState(true);

  useEffect(() => {
    if (state.message) {
      if(state.success && state.data) {
        setResult(state.data);
        setShowSample(false);
      } else if (!state.success) {
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: state.message,
        });
      }
    }
  }, [state, toast]);

  return (
    <section id="analyzer" className="w-full pb-20 md:pb-24 lg:pb-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <form action={formAction} className="flex flex-col md:flex-row items-center gap-4 rounded-lg border p-4 bg-card/50 shadow-lg">
            <Input
              name="ticker"
              placeholder="Enter stock ticker (e.g., AAPL)"
              className="h-12 text-lg bg-background"
              required
              aria-label="Stock Ticker"
            />
            <SubmitButton />
          </form>
        </div>

        <div className="mt-12 mx-auto max-w-4xl">
            {result && <AnalysisResultCard result={result} isSample={showSample} />}
        </div>
      </div>
    </section>
  );
}
