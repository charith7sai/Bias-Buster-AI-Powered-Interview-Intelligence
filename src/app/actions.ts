"use server";

import { z } from "zod";
import {
  generateStarAnalysis,
  type StarAnalysisOutput,
} from "@/ai/flows/generate-star-analysis";
import {
  detectInterviewerBias,
  type DetectInterviewerBiasOutput,
} from "@/ai/flows/detect-interviewer-bias";
import {
  generateCandidateScore,
  type GenerateCandidateScoreOutput,
} from "@/ai/flows/generate-candidate-score";
import { MOCK_TRANSCRIPT } from "@/lib/mock-data";

const formSchema = z.object({
  jobDescription: z.string().min(1, "Job description is required."),
  candidateName: z.string().min(1, "Candidate name is required."),
  interviewerName: z.string().min(1, "Interviewer name is required."),
});

export type AnalysisResult = {
  starAnalysis: StarAnalysisOutput;
  biasDetection: DetectInterviewerBiasOutput;
  candidateScore: GenerateCandidateScoreOutput;
  transcript: string;
};

// This function simulates a delay to mimic a real-world processing time.
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function analyzeInterview(formData: FormData): Promise<{
  data: AnalysisResult | null;
  error: string | null;
}> {
  try {
    const rawFormData = Object.fromEntries(formData.entries());
    const validation = formSchema.safeParse(rawFormData);

    if (!validation.success) {
      return {
        data: null,
        error: validation.error.errors.map((e) => e.message).join(", "),
      };
    }

    const { jobDescription, candidateName, interviewerName } = validation.data;
    const transcript = MOCK_TRANSCRIPT;

    // Simulate processing time
    await sleep(2000);

    const [starAnalysisResult, biasDetectionResult] = await Promise.all([
      generateStarAnalysis({
        interviewText: transcript,
        candidateName,
        jobDescription,
      }),
      detectInterviewerBias({
        transcript,
        candidateName,
        interviewerName,
      }),
    ]);
    
    // Create a summary of STAR analysis to feed into the candidate score generator
    const starAnalysisSummary = `
      Overall Rating: ${starAnalysisResult.overallRating}. 
      Strengths: ${starAnalysisResult.strengths}. 
      Areas for Improvement: ${starAnalysisResult.improvements}.
      Scores per question: ${JSON.stringify(starAnalysisResult.starScores)}
    `;

    const candidateScoreResult = await generateCandidateScore({
      starAnalysis: starAnalysisSummary
    });
    
    return {
      data: {
        starAnalysis: starAnalysisResult,
        biasDetection: biasDetectionResult,
        candidateScore: candidateScoreResult,
        transcript,
      },
      error: null,
    };
  } catch (err) {
    console.error("Analysis failed:", err);
    return { data: null, error: "An unexpected error occurred during analysis." };
  }
}
