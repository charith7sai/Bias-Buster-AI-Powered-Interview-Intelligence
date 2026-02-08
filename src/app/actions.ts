"use server";

import type { StarAnalysisOutput } from "@/ai/flows/generate-star-analysis";
import type { DetectInterviewerBiasOutput } from "@/ai/flows/detect-interviewer-bias";
import type { GenerateCandidateScoreOutput } from "@/ai/flows/generate-candidate-score";
import { MOCK_TRANSCRIPT } from "@/lib/mock-data";

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
    const transcript = MOCK_TRANSCRIPT;

    // Simulate processing time
    await sleep(2000);

    const mockAnalysis: AnalysisResult = {
      starAnalysis: {
        overallRating: "Good",
        strengths:
          "The candidate provides clear and structured answers. They effectively use the STAR method to describe their experiences.",
        improvements:
          "The candidate could provide more quantifiable results to better demonstrate the impact of their actions.",
        starScores: {
          "Challenging project with a tight deadline": 4,
          "Conflict with a team member": 5,
        },
      },
      biasDetection: {
        overallAssessment:
          "The interview appears to be conducted fairly. No significant biases were detected. The interviewer's questions were open-ended and focused on the candidate's experience and skills.",
        biases: [],
      },
      candidateScore: {
        overallScore: 85,
        strengths:
          "- Strong communication skills\n- Solid problem-solving abilities\n- Good experience with conflict resolution",
        improvements: "- Could provide more data-driven results",
      },
      transcript,
    };

    return {
      data: mockAnalysis,
      error: null,
    };
  } catch (err) {
    console.error("Analysis failed:", err);
    return {
      data: null,
      error: "An unexpected error occurred during analysis.",
    };
  }
}
