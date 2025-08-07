'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { AnalyzeStockDataOutput } from "@/ai/flows/analyze-stock-data";
import { cn } from "@/lib/utils";

interface AnalysisResultCardProps {
  result: AnalyzeStockDataOutput;
  isSample?: boolean;
}

export function AnalysisResultCard({ result, isSample = false }: AnalysisResultCardProps) {
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
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Momentum Score</h3>
          <div className="flex items-center gap-4">
            <Progress value={result.momentumScore} className="w-full h-3" />
            <span className="text-lg font-bold text-foreground">{result.momentumScore}</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">AI Explanation</h3>
          <p className="text-foreground/90">{result.explanation}</p>
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
