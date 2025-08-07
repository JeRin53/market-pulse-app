'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { AnalyzeStockDataOutput } from "@/ai/flows/analyze-stock-data";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

interface AnalysisResultCardProps {
  result: AnalyzeStockDataOutput;
  isSample?: boolean;
}

export function AnalysisResultCard({ result, isSample = false }: AnalysisResultCardProps) {
    
  const momentumScorePercentage = (result.momentum.score + 1) * 50;

  return (
    <Card className="w-full transform transition-all duration-500 animate-in fade-in-0 zoom-in-95">
      <CardHeader className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-4">
            <CardDescription>Ticker</CardDescription>
            {isSample && <Badge variant="secondary">Sample</Badge>}
          </div>
          <CardTitle className="text-4xl font-bold font-headline">{result.ticker}</CardTitle>
        </div>
        <div className="flex flex-col justify-center items-start md:items-end">
          <CardDescription>Pulse</CardDescription>
          <Badge
            className={cn(
              "text-lg capitalize px-4 py-1 mt-1",
              result.pulse === 'bullish' && 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30',
              result.pulse === 'bearish' && 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30',
              result.pulse === 'neutral' && 'bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/30'
            )}
            variant="outline"
          >
            {result.pulse}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">AI Explanation</h3>
            <p className="text-foreground/90">{result.explanation}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Momentum Score</h3>
                <div className="flex items-center gap-4">
                    <Progress value={momentumScorePercentage} className="w-full h-3" />
                    <span className="text-lg font-bold text-foreground">{result.momentum.score}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Based on the average of the last 5 daily returns.</p>
            </div>
            <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Last 5 Trading-Day Returns</h3>
                <div className="flex items-center gap-2 flex-wrap">
                    {result.momentum.returns.map((r, i) => (
                        <div key={i} className={cn("flex items-center gap-1 p-1 rounded-md text-xs", r >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400')}>
                            {r >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                            <span>{(r*100).toFixed(2)}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Latest News</h3>
            <div className="space-y-3">
                {result.news.slice(0, 3).map((article, index) => (
                    <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg border bg-card hover:bg-secondary transition-colors">
                        <p className="font-semibold text-foreground/90">{article.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{article.summary}</p>
                    </a>
                ))}
            </div>
        </div>
      
      </CardContent>
      <CardFooter>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>View Raw JSON</AccordionTrigger>
            <AccordionContent>
              <pre className="mt-2 w-full rounded-md bg-muted p-4 overflow-x-auto">
                <code className="text-muted-foreground font-code">{JSON.stringify(result, null, 2)}</code>
              </pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}