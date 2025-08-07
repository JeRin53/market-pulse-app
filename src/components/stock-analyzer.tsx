'use client';

import { useEffect, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getStockAnalysis, type FormState } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AnalysisResultCard } from '@/components/analysis-result-card';
import type { AnalyzeStockDataOutput } from '@/ai/flows/analyze-stock-data';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

const initialState: FormState = {
  message: '',
  success: false,
};

const sampleResult: AnalyzeStockDataOutput = {
  ticker: 'SMPL',
  momentum: {
    returns: [0.012, -0.005, 0.02, -0.01, 0.015],
    score: 0.0064
  },
  news: [
    { title: 'Sample News: SMPL Innovations Announces Breakthrough in AI', summary: 'The company revealed a new technology that could revolutionize the industry.', url: '#' },
    { title: 'Market Analysts Upgrade SMPL to "Strong Buy"', summary: 'Following recent positive earnings reports, analysts are optimistic about the stock\'s future.', url: '#'},
    { title: 'SMPL Expands into European Markets', summary: 'The expansion is expected to significantly increase revenue streams for the company.', url: '#'}
  ],
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

const ResultSkeleton = () => (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-8 w-1/6" />
      </div>
      <Skeleton className="h-24 w-full" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
      <Skeleton className="h-32 w-full" />
    </div>
);


export default function StockAnalyzer() {
  const [state, formAction] = useActionState(getStockAnalysis, initialState);
  const { pending } = useFormStatus();
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
        setResult(null); // Clear result on error
      }
    }
  }, [state, toast]);

  const handleFormAction = (formData: FormData) => {
    setResult(null); // Clear previous results immediately
    setShowSample(false);
    formAction(formData);
  };


  return (
    <section id="analyzer" className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <form action={handleFormAction} className="flex flex-col md:flex-row items-center gap-4 rounded-lg border p-4 bg-card/60 backdrop-blur-sm shadow-lg">
            <Input
              name="ticker"
              placeholder="Enter stock ticker (e.g., AAPL)"
              className="h-12 text-lg bg-background border-accent/30 focus:border-accent"
              required
              aria-label="Stock Ticker"
            />
            <SubmitButton />
          </form>
        </div>

        <div className="mt-12 mx-auto max-w-4xl">
            {pending && <ResultSkeleton />}
            {!pending && result && <AnalysisResultCard result={result} isSample={showSample} />}
        </div>
      </div>
    </section>
  );
}
