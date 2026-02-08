import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Bot, Gauge, ShieldCheck } from "lucide-react";
import { AppIcon } from "@/components/icons";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-primary/5 to-background">
        <div className="container px-4 text-center md:px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-block px-4 py-1 text-sm font-semibold tracking-wider rounded-full bg-primary/10 text-primary">
              AI-Powered Interview Analysis
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-balance">
              Eliminate Unconscious Bias from Your Interviews
            </h1>
            <p className="max-w-xl mx-auto text-lg text-muted-foreground text-balance">
              Bias Buster uses AI to analyze interview recordings, helping you conduct fairer, more objective interviews.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/signup">Get Started for Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/analysis">Try the Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-20 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-3 rounded-full bg-primary/10">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">STAR Method Analysis</h3>
              <p className="text-muted-foreground">
                Automatically evaluate candidate responses against the STAR framework (Situation, Task, Action, Result) to gauge behavioral competencies.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-3 rounded-full bg-primary/10">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Interviewer Bias Detection</h3>
              <p className="text-muted-foreground">
                Identify potential biases like leading questions, interruptions, or sentiment imbalance to ensure a fair evaluation process.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-3 rounded-full bg-primary/10">
                <Gauge className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Comprehensive Scoring</h3>
              <p className="text-muted-foreground">
                Receive an overall candidate score along with a detailed breakdown of strengths and areas for improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="w-full py-20 md:py-24 lg:py-32">
        <div className="container max-w-4xl px-4 mx-auto md:px-6">
          <h2 className="mb-12 text-3xl font-bold text-center sm:text-4xl">Frequently Asked Questions</h2>
          <div className="space-y-6">
              <div>
                  <h3 className="font-semibold text-lg">Is my data secure?</h3>
                  <p className="text-muted-foreground mt-2">Yes. Bias Buster runs 100% locally on your machine. Your interview recordings and analysis results never leave your device, ensuring complete privacy and security.</p>
              </div>
              <div>
                  <h3 className="font-semibold text-lg">What file formats are supported?</h3>
                  <p className="text-muted-foreground mt-2">The application accepts common audio and video formats like MP3, WAV, MP4, and WebM. The processing happens in your browser.</p>
              </div>
              <div>
                  <h3 className="font-semibold text-lg">Does this require an internet connection to work?</h3>
                  <p className="text-muted-foreground mt-2">An internet connection is only needed to load the application initially. All analysis is performed offline on your computer.</p>
              </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-muted-foreground text-sm border-t">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <AppIcon className="w-6 h-6" />
            <span>Bias Buster</span>
          </div>
          <p>&copy; 2024 Bias Buster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
