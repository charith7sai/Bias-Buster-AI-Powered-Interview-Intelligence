"use client";

import React from "react";
import type { AnalysisResult } from "@/app/actions";
import { OverallScoreCard } from "./overall-score-card";
import { StarAnalysisCard } from "./star-analysis-card";
import { StrengthsImprovementsCard } from "./strengths-improvements-card";
import { BiasDetectionCard } from "./bias-detection-card";
import { TranscriptCard } from "./transcript-card";

interface AnalysisDashboardProps {
  analysis: AnalysisResult;
}

export function AnalysisDashboard({ analysis }: AnalysisDashboardProps) {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="animate-in fade-in slide-in-from-left-4 duration-700 delay-100 fill-mode-both">
          <OverallScoreCard
            score={analysis.candidateScore.overallScore}
            strengths={analysis.starAnalysis.strengths}
            improvements={analysis.starAnalysis.improvements}
          />
        </div>
        <div className="animate-in fade-in slide-in-from-right-4 duration-700 delay-200 fill-mode-both">
          <StarAnalysisCard starAnalysis={analysis.starAnalysis} />
        </div>
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
        <StrengthsImprovementsCard
          strengths={analysis.candidateScore.strengths}
          improvements={analysis.candidateScore.improvements}
        />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 fill-mode-both">
        <BiasDetectionCard biasDetection={analysis.biasDetection} />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
        <TranscriptCard transcript={analysis.transcript} />
      </div>
    </div>
  );
}
