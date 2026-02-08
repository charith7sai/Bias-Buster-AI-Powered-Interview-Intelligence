"use client";

import React, { useState, useTransition } from "react";
import { BrainCircuit } from "lucide-react";

import { UploadForm } from "@/components/upload-form";
import type { AnalysisResult } from "@/app/actions";
import { analyzeInterview } from "@/app/actions";
import { AnalysisDashboard } from "@/components/analysis-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { AppIcon } from "@/components/icons";

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAnalysis = async (formData: FormData) => {
    setAnalysis(null);

    startTransition(async () => {
      const { data, error } = await analyzeInterview(formData);

      if (error) {
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: error,
        });
        return;
      }

      setAnalysis(data);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 flex items-center h-16 px-4 border-b bg-background/80 backdrop-blur-sm shrink-0 md:px-6">
        <div className="flex items-center gap-2">
          <AppIcon className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold tracking-tight font-headline">
            Interview<span className="text-primary">IQ</span>
          </h1>
        </div>
      </header>
      <main className="flex-1 w-full max-w-screen-xl px-4 py-8 mx-auto md:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <UploadForm isPending={isPending} onSubmit={handleAnalysis} />
          </div>
          <div className="lg:col-span-8">
            {isPending ? (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Skeleton className="h-[200px] rounded-lg" />
                  <Skeleton className="h-[200px] rounded-lg" />
                </div>
                <Skeleton className="h-[300px] rounded-lg" />
                <Skeleton className="h-[300px] rounded-lg" />
                <Skeleton className="h-[300px] rounded-lg" />
              </div>
            ) : analysis ? (
              <AnalysisDashboard analysis={analysis} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center border-2 border-dashed rounded-lg bg-card/50">
                <BrainCircuit className="w-16 h-16 mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-semibold tracking-tight font-headline">
                  Awaiting Interview Analysis
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Upload an interview recording and provide details to start the AI-powered analysis.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-muted-foreground text-sm">
        <p>&copy; 2024 InterviewIQ. Runs entirely locally.</p>
      </footer>
    </div>
  );
}
