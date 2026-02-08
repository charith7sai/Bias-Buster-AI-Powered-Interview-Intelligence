"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { BrainCircuit } from "lucide-react";

import { UploadForm } from "@/components/upload-form";
import type { AnalysisResult } from "@/app/actions";
import { analyzeInterview } from "@/app/actions";
import { AnalysisDashboard } from "@/components/analysis-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/firebase";

export default function AnalysisPage() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);


  const handleAnalysis = async () => {
    setAnalysis(null);

    startTransition(async () => {
      const { data, error } = await analyzeInterview();

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

  if (isUserLoading || !user) {
    return (
       <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
       </div>
    );
  }


  return (
    <div className="flex-1 w-full max-w-screen-xl px-4 py-8 mx-auto md:px-6">
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
    </div>
  );
}

import { Loader2 } from 'lucide-react';

function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
    );
}
