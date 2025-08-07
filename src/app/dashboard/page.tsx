import { AnimatedSection } from "@/components/animated-section";
import StockAnalyzer from "@/components/stock-analyzer";

export default function DashboardPage() {
    return (
        <div className="w-full py-20 md:py-24 lg:py-32">
            <AnimatedSection>
                <div className="container px-4 md:px-6">
                    <div className="mx-auto grid max-w-4xl place-items-center gap-6 text-center">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                            Stock Analysis Dashboard
                        </h1>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl">
                            Enter a stock ticker below to get a real-time bullish, bearish, or neutral signal with an AI explanation using the latest news and momentum data.
                        </p>
                    </div>
                </div>
            </AnimatedSection>

            <AnimatedSection>
                <StockAnalyzer />
            </AnimatedSection>
        </div>
    )
}
