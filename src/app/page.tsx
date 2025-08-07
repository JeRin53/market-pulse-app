import { BarChart3, BrainCircuit, Search, Droplets } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/animated-section';

const Logo = () => (
  <div className="flex items-center gap-2">
    <Droplets className="h-7 w-7 text-primary" />
    <span className="text-xl font-bold font-headline">Market Pulse</span>
  </div>
);

const AnimatedHeroBackground = () => (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-r from-accent/20 to-primary/20 blur-3xl" />
    </div>
);


export default function Home() {
  return (
    <>
      <section id="hero" className="relative w-full overflow-hidden py-20 md:py-32 lg:py-40">
        <AnimatedHeroBackground />
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-4xl place-items-center gap-6 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              AI-Powered Stock Analysis
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Get a bullish, bearish, or neutral signal with an AI explanation using the latest news and momentum data.
            </p>
            <div className="flex gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/dashboard">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/about">Learn More</Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection id="how-it-works">
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
                <div className="flex flex-col items-center space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-primary/20 hover:scale-105 hover:border-accent">
                  <Search className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold font-headline">1. Enter Ticker</h3>
                  <p className="text-muted-foreground text-center">
                    Provide the stock ticker symbol you want to analyze.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-primary/20 hover:scale-105 hover:border-accent">
                  <BarChart3 className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold font-headline">2. Analyze Data</h3>
                  <p className="text-muted-foreground text-center">
                    Our AI processes vast amounts of news and momentum data.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-primary/20 hover:scale-105 hover:border-accent">
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
      </AnimatedSection>

      <AnimatedSection id="final-cta">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Ready to Dive In?</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The market is waiting. Click the button below to start your first analysis.
            </p>
             <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/dashboard">Analyze a Stock</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
