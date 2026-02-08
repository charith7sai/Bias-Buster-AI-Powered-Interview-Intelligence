"use server";

import { MOCK_TRANSCRIPT } from "@/lib/mock-data";

// Copied types from AI flows to decouple the action from them
// This allows the app to run without a configured Genkit/API key

export type StarBreakdown = {
  question: string;
  situation: string;
  task: string;
  action: string;
  result: string;
};

export type StarAnalysisOutput = {
  overallRating: string;
  strengths: string;
  improvements: string;
  starScores: Record<string, number>;
  starBreakdowns: StarBreakdown[];
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
  candidateName: string;
  starAnalysis: StarAnalysisOutput;
  biasDetection: DetectInterviewerBiasOutput;
  candidateScore: GenerateCandidateScoreOutput;
  transcript: string;
  id?: string;
};

// This function simulates a delay to mimic a real-world processing time.
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockAnalyses: Omit<AnalysisResult, 'transcript' | 'candidateName'>[] = [
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
       starBreakdowns: [
        {
          question: "Challenging project with a tight deadline",
          situation: "We had a key client e-commerce platform project with a six-month timeline. The client suddenly moved the launch date up by two months to coincide with a new marketing campaign.",
          task: "My responsibility as the lead Project Manager was to re-plan the entire project to meet the new, aggressive deadline without sacrificing essential platform features or quality.",
          action: "I immediately assembled the team leads to re-prioritize features using the MoSCoW method. I successfully renegotiated scope with the client to move non-critical features to a phase two release. I also adopted a more agile workflow with daily stand-ups and onboarded a freelance designer to accelerate the design process.",
          result: "We launched the platform on the new deadline. It performed flawlessly during the marketing campaign, leading to a 20% increase in the client's online sales in the first month. The team's morale was high, and our new agile process was adopted company-wide.",
        },
        {
          question: "Conflict with a team member",
          situation: "A senior developer on the project was resistant to the new agile process I introduced, viewing it as micromanagement. This created friction within the team.",
          task: "I needed to resolve this conflict to maintain team morale and ensure we stayed on track with our accelerated timeline.",
          action: "I met with the developer one-on-one to listen to his concerns. We collaborated on modifying the stand-up format to be more efficient. I also gave him full ownership of a critical backend component to empower him and leverage his expertise.",
          result: "The developer became a strong advocate for the new process. The team's communication improved, the conflict was resolved, and his contributions were crucial to the project's success.",
        },
      ],
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
      starBreakdowns: [
        {
          question: "Challenging project with a tight deadline",
          situation: "My team was working on a client project, and the deadline was moved up.",
          task: "I had to figure out how to get the project done faster.",
          action: "I talked to the team about what features were most important. We decided to focus on the core functionalities and pushed some other things to a later update. I also set up more frequent check-in meetings.",
          result: "We managed to launch the main platform on time. The client was happy that we met the new date.",
        },
        {
          question: "Conflict with a team member",
          situation: "I had a disagreement with a coworker about the best way to approach a task.",
          task: "We needed to get on the same page so we could move forward.",
          action: "I asked them to have a chat. We talked about our different ideas and found a compromise that worked for both of us.",
          result: "We were able to resolve the issue and finish the task together. Our working relationship got better after that.",
        },
      ],
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
      starBreakdowns: [
        {
          question: "Challenging project with a tight deadline",
          situation: "We had a project that was due soon.",
          task: "The task was to finish it on time.",
          action: "I worked extra hours to get my parts done. I tried to tell everyone to work faster.",
          result: "The project was a bit late, but we eventually finished it. It was a stressful time.",
        },
        {
          question: "Conflict with a team member",
          situation: "A teammate and I weren't agreeing on things.",
          task: "I had to deal with the situation.",
          action: "I mostly just tried to avoid them to prevent more arguments. I did my work, and they did theirs.",
          result: "We didn't argue anymore, but we also didn't collaborate much. The work got done, but it wasn't a great team atmosphere.",
        },
      ],
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


export async function analyzeInterview(candidateName: string): Promise<{
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
      candidateName,
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
