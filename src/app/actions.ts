"use server";

import { MOCK_TRANSCRIPT } from "@/lib/mock-data";

// Copied types from AI flows to decouple the action from them
// This allows the app to run without a configured Genkit/API key
export type StarAnalysisOutput = {
  overallRating: string;
  strengths: string;
  improvements: string;
  starScores: Record<string, number>;
};

export type DetectInterviewerBiasOutput = {
  overallAssessment: string;
  biases: {
    biasType: string;
    description: string;
    severity: string;
    example?: string | undefined;
  }[];
};

type GenerateCandidateScoreOutput = {
  overallScore: number;
  strengths: string;
  improvements: string;
};

export type AnalysisResult = {
  starAnalysis: StarAnalysisOutput;
  biasDetection: DetectInterviewerBiasOutput;
  candidateScore: GenerateCandidateScoreOutput;
  transcript: string;
};

// This function simulates a delay to mimic a real-world processing time.
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockAnalyses: Omit<AnalysisResult, 'transcript'>[] = [
  {
    starAnalysis: {
      overallRating: "Excellent",
      strengths:
        "Candidate provides exceptionally clear, well-structured, and detailed answers using the STAR method. They consistently demonstrate strong ownership and impact.",
      improvements:
        "While technically proficient, the candidate could benefit from showcasing more proactive leadership initiatives in their examples.",
      starScores: {
        "Challenging project with a tight deadline": 5,
        "Conflict with a team member": 5,
      },
    },
    biasDetection: {
      overallAssessment:
        "The interview was conducted fairly. The interviewer maintained a neutral and professional tone, asking open-ended questions that allowed the candidate to fully express their experiences.",
      biases: [],
    },
    candidateScore: {
      overallScore: 92,
      strengths:
        "- Exceptional communication and storytelling\n- Strong problem-solving and analytical skills\n- Demonstrates high levels of ownership and accountability",
      improvements: "- Proactively seek out leadership opportunities",
    },
  },
  {
    starAnalysis: {
      overallRating: "Good",
      strengths:
        "The candidate effectively uses the STAR method for most questions, providing clear context and actions. They show a good understanding of their role and contributions.",
      improvements:
        "The candidate could provide more quantifiable results to better demonstrate the impact of their actions. Some answers were slightly generic.",
      starScores: {
        "Challenging project with a tight deadline": 4,
        "Conflict with a team member": 4,
      },
    },
    biasDetection: {
      overallAssessment:
        "The interview appears to be mostly fair. However, a potential 'Affinity Bias' was noted, as the interviewer and candidate shared a similar background, leading to a more conversational and less structured Q&A at times.",
      biases: [
        {
          biasType: "Affinity Bias",
          description: "The tendency to favor people who are similar to us. The interviewer and candidate both attended the same university, which was mentioned multiple times.",
          severity: "Low",
          example: "Interviewer: 'Oh, you went to State University too? Go Bulldogs! Did you have Professor Smith for computer science?'"
        }
      ],
    },
    candidateScore: {
      overallScore: 81,
      strengths:
        "- Solid communication skills\n- Good experience with teamwork and collaboration\n- Technically competent in core areas",
      improvements: "- Focus on quantifying achievements with data\n- Prepare more unique and memorable examples",
    },
  },
  {
    starAnalysis: {
      overallRating: "Needs Improvement",
      strengths:
        "The candidate is enthusiastic and shows a willingness to learn. They attempted to structure their answers, but often missed key components of the STAR method.",
      improvements:
        "Answers lack depth and specific details. The candidate often spoke in generalities and struggled to provide concrete examples of their actions and the results.",
      starScores: {
        "Challenging project with a tight deadline": 2,
        "Conflict with a team member": 3,
      },
    },
    biasDetection: {
      overallAssessment: "A potential 'Leading Question' bias was detected. The interviewer sometimes phrased questions in a way that suggested the desired answer, which may have influenced the candidate's responses.",
      biases: [
        {
          biasType: "Leading Questions",
          description: "Questions that prompt or encourage the desired answer.",
          severity: "Medium",
          example: "Interviewer: 'So, you'd say you're a great team player who always steps up, right?'"
        }
      ],
    },
    candidateScore: {
      overallScore: 65,
      strengths:
        "- Positive attitude and high energy\n- Eager to take on new challenges",
      improvements:
        "- Practice the STAR method to structure answers\n- Prepare specific examples before the interview\n- Work on providing more detail about personal contributions",
    },
  },
];


export async function analyzeInterview(): Promise<{
  data: AnalysisResult | null;
  error: string | null;
}> {
  try {
    const transcript = MOCK_TRANSCRIPT;

    // Simulate processing time
    await sleep(2000);

    // Randomly select one of the mock analyses
    const randomIndex = Math.floor(Math.random() * mockAnalyses.length);
    const baseAnalysis = mockAnalyses[randomIndex];
    
    // Add a little more randomness to the score
    const randomScoreAdjustment = Math.floor(Math.random() * 6) - 3; // -3 to +2
    const finalScore = Math.min(100, Math.max(0, baseAnalysis.candidateScore.overallScore + randomScoreAdjustment));

    const finalAnalysis: AnalysisResult = {
      ...baseAnalysis,
      candidateScore: {
        ...baseAnalysis.candidateScore,
        overallScore: finalScore,
      },
      transcript,
    };

    return {
      data: finalAnalysis,
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
