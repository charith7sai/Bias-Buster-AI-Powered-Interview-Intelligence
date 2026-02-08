"use client";

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
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <OverallScoreCard
          score={analysis.candidateScore.overallScore}
          strengths={analysis.starAnalysis.strengths}
          improvements={analysis.starAnalysis.improvements}
        />
        <StarAnalysisCard starScores={analysis.starAnalysis.starScores} />
      </div>
      <StrengthsImprovementsCard
        strengths={analysis.candidateScore.strengths}
        improvements={analysis.candidateScore.improvements}
      />
      <BiasDetectionCard biasDetection={analysis.biasDetection} />
      <TranscriptCard transcript={analysis.transcript} />
    </div>
  );
}
