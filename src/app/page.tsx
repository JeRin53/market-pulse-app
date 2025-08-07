import { BarChart3, BrainCircuit, Search, Droplets } from 'lucide-react';
import StockAnalyzer from '@/components/stock-analyzer';

const Logo = () => (
  <div className="flex items-center gap-2">
    <Droplets className="h-7 w-7 text-primary" />
    <span className="text-xl font-bold font-headline">Market Pulse</span>
  </div>
);

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Logo />
        </div>
      </header>
      <main className="flex-1">
        <section id="hero" className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-4xl place-items-center gap-6 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                AI-Powered Stock Analysis
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Enter a stock ticker to get a bullish, bearish, or neutral signal with an AI explanation using the latest news and momentum data.
              </p>
            </div>
          </div>
        </section>

        <StockAnalyzer />

        <section id="how-it-works" className="w-full py-20 md:py-32 bg-card/50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">How It Works</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                    Get stock insights in three simple steps. Our AI analyzes market data to give you a clear signal.
                  </p>
                </div>
              </div>
              <div className="mx-auto w-full max-w-4xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <div className="flex flex-col items-center space-y-4 rounded-lg border border-border bg-background p-6 shadow-sm transition-all hover:shadow-primary/20 hover:scale-105">
                    <Search className="h-12 w-12 text-primary" />
                    <h3 className="text-xl font-bold font-headline">1. Enter Ticker</h3>
                    <p className="text-muted-foreground text-center">
                      Provide the stock ticker symbol you want to analyze.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-4 rounded-lg border border-border bg-background p-6 shadow-sm transition-all hover:shadow-primary/20 hover:scale-105">
                    <BarChart3 className="h-12 w-12 text-primary" />
                    <h3 className="text-xl font-bold font-headline">2. Analyze Data</h3>
                    <p className="text-muted-foreground text-center">
                      Our AI processes vast amounts of news and momentum data.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-4 rounded-lg border border-border bg-background p-6 shadow-sm transition-all hover:shadow-primary/20 hover:scale-105">
                    <BrainCircuit className="h-12 w-12 text-primary" />
                    <h3 className="text-xl font-bold font-headline">3. Get AI Insights</h3>
                    <p className="text-muted-foreground text-center">
                      Receive a clear signal and a data-backed explanation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="final-cta" className="w-full py-20 md:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Ready to Dive In?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Scroll up and enter a ticker to get started with your first analysis. The market is waiting.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex-shrink-0 border-t">
        <div className="container py-6 flex justify-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Market Pulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
