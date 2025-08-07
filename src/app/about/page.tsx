import { AnimatedSection } from "@/components/animated-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const TechStack = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Genkit (for AI)",
    "Firebase (for Auth)",
    "Shadcn/UI",
    "Framer Motion",
    "Recharts"
]

export default function AboutPage() {
  return (
    <div className="w-full py-20 md:py-24 lg:py-32">
      <AnimatedSection id="about-us">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-4xl place-items-center gap-6 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              About Market Pulse
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Market Pulse is an AI-powered tool designed to give you a quick, data-driven snapshot of a stock's current market sentiment. We leverage cutting-edge technology to analyze financial data and deliver actionable insights in a clean, user-friendly interface.
            </p>
          </div>

          <div className="mx-auto max-w-5xl mt-16">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Technology Stack</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">We use a modern, robust tech stack to deliver a fast, reliable, and beautiful user experience.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {TechStack.map((tech) => (
                            <div key={tech} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-primary"/>
                                <span className="font-medium">{tech}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
