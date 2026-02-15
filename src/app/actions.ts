"use server";

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

type MockData = {
  transcript: string;
  analysis: Omit<AnalysisResult, "transcript" | "candidateName" | "id">;
};

const MOCK_DATA: MockData[] = [
  {
    transcript: `Interviewer: Good morning, thanks for coming in. To start, could you tell me about a time you had to handle a challenging project with a tight deadline?

Candidate: Good morning. Yes, certainly. In my previous role as a Project Manager at TechSolutions, we were tasked with developing a new e-commerce platform for a major client. The original timeline was six months, but the client suddenly requested to launch two months earlier to align with their new marketing campaign.

Interviewer: That sounds like a significant challenge. What was your specific role and what did you have to do?

Candidate: As the lead PM, my task was to re-evaluate the entire project plan and figure out how to meet this new deadline without compromising the core features. I had to coordinate with the development, design, and QA teams to identify what was feasible.

Interviewer: So how did you approach this? What actions did you take?

Candidate: First, I organized an emergency meeting with all team leads. I broke down the remaining work into 'must-have' and 'nice-to-have' features using the MoSCoW method. I then renegotiated the scope with the client, getting them to agree to move some 'nice-to-have' features to a post-launch phase. For my team, I implemented a more agile workflow with daily stand-ups to track progress closely and quickly resolve any blockers. I also allocated a small part of the budget to bring in a freelance UI designer for a week to speed up the design phase.

Interviewer: That's a comprehensive approach. What was the outcome of your actions?

Candidate: The result was that we successfully launched the platform on the revised deadline. The client was thrilled with the core functionality and our ability to adapt. The platform handled the marketing campaign traffic without any issues, leading to a 20% increase in their online sales in the first month. Our team also felt a great sense of accomplishment, and the new agile process I introduced was adopted for future projects.

Interviewer: That's a great example, thank you. Now, can you describe a situation where you had a conflict with a team member and how you resolved it?

Candidate: Yes. On that same project, one of the senior developers was very resistant to the new agile approach. He felt it was micromanagement and disrupted his workflow. This caused some tension in the team. My task was to address this conflict before it affected team morale and productivity.

Interviewer: How did you handle that?

Candidate: I scheduled a one-on-one meeting with him to understand his concerns. I actively listened to his perspective and acknowledged his experience and expertise. Instead of just imposing the new process, I asked for his suggestions on how we could adapt it to better suit the team's needs while still meeting our goals. We agreed to try a modified version of the daily stand-ups, making them more focused and shorter. I also gave him ownership of a critical component of the project, which empowered him.

Interviewer: And the result?

Candidate: He became much more engaged and even started championing the agile process to other team members. The conflict was resolved, and the team's communication and collaboration improved significantly. The project benefited from his valuable input, and we avoided a potential bottleneck.
`,
    analysis: {
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
            situation:
              "We had a key client e-commerce platform project with a six-month timeline. The client suddenly moved the launch date up by two months to coincide with a new marketing campaign.",
            task: "My responsibility as the lead Project Manager was to re-plan the entire project to meet the new, aggressive deadline without sacrificing essential platform features or quality.",
            action:
              "I immediately assembled the team leads to re-prioritize features using the MoSCoW method. I successfully renegotiated scope with the client to move non-critical features to a phase two release. I also adopted a more agile workflow with daily stand-ups and onboarded a freelance designer to accelerate the design process.",
            result:
              "We launched the platform on the new deadline. It performed flawlessly during the marketing campaign, leading to a 20% increase in the client's online sales in the first month. The team's morale was high, and our new agile process was adopted company-wide.",
          },
          {
            question: "Conflict with a team member",
            situation:
              "A senior developer on the project was resistant to the new agile process I introduced, viewing it as micromanagement. This created friction within the team.",
            task: "I needed to resolve this conflict to maintain team morale and ensure we stayed on track with our accelerated timeline.",
            action:
              "I met with the developer one-on-one to listen to his concerns. We collaborated on modifying the stand-up format to be more efficient. I also gave him full ownership of a critical backend component to empower him and leverage his expertise.",
            result:
              "The developer became a strong advocate for the new process. The team's communication improved, the conflict was resolved, and his contributions were crucial to the project's success.",
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
  },
  {
    transcript: `Interviewer: Thanks for joining. Let's start with this: tell me about a time you had to deal with a challenging project deadline.

Candidate: Sure. In my last role, my team was working on a client project, and the deadline was moved up by several weeks. It created a lot of pressure. I actually learned to handle pressure like that back at State University.

Interviewer: Oh, you went to State University too? Go Bulldogs! Did you have Professor Smith for computer science? It's a small world. Anyway, what was your specific responsibility in that situation?

Candidate: My job was to figure out how to get the project done faster without a drop in quality. I needed to get the team aligned on a new plan.

Interviewer: And what steps did you take?

Candidate: I talked to the team about what features were most important. We decided to focus on the core functionalities and pushed some other things to a later update. I also set up more frequent check-in meetings to make sure we were on track.

Interviewer: What was the outcome?

Candidate: We managed to launch the main platform on time. The client was happy that we met the new date, and the core product was solid.

Interviewer: Good. Let's move on. Have you ever had a conflict with a coworker?

Candidate: Yes, I had a disagreement with a coworker about the best way to approach a task. We had different ideas on the technical implementation.

Interviewer: What did you do to resolve it?

Candidate: I asked them to have a chat. We sat down, and I made sure to listen to their point of view. We talked about our different ideas and eventually found a compromise that used parts of both our approaches and worked for both of us.

Interviewer: And the result of that conversation?

Candidate: We were able to resolve the issue and finish the task together. Our working relationship got better after that because we understood each other's perspectives more.
`,
    analysis: {
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
            situation:
              "My team was working on a client project, and the deadline was moved up.",
            task: "I had to figure out how to get the project done faster.",
            action:
              "I talked to the team about what features were most important. We decided to focus on the core functionalities and pushed some other things to a later update. I also set up more frequent check-in meetings.",
            result:
              "We managed to launch the main platform on time. The client was happy that we met the new date.",
          },
          {
            question: "Conflict with a team member",
            situation:
              "I had a disagreement with a coworker about the best way to approach a task.",
            task: "We needed to get on the same page so we could move forward.",
            action:
              "I asked them to have a chat. We talked about our different ideas and found a compromise that worked for both of us.",
            result:
              "We were able to resolve the issue and finish the task together. Our working relationship got better after that.",
          },
        ],
      },
      biasDetection: {
        overallAssessment:
          "The interview appears to be mostly fair. However, a potential 'Affinity Bias' was noted, as the interviewer and candidate shared a similar background, leading to a more conversational and less structured Q&A at times.",
        biases: [
          {
            biasType: "Affinity Bias",
            description:
              "The tendency to favor people who are similar to us. The interviewer and candidate both attended the same university, which was mentioned multiple times.",
            severity: "Low",
            example:
              "Interviewer: 'Oh, you went to State University too? Go Bulldogs! Did you have Professor Smith for computer science?'",
          },
        ],
      },
      candidateScore: {
        overallScore: 81,
        strengths:
          "- Solid communication skills\n- Good experience with teamwork and collaboration\n- Technically competent in core areas",
        improvements:
          "- Focus on quantifying achievements with data\n- Prepare more unique and memorable examples",
      },
    },
  },
  {
    transcript: `Interviewer: Let's talk about a project with a tight deadline. You've handled those well, I assume?

Candidate: Um, yes. We had a project that was due soon.

Interviewer: And what was your task? I imagine it was to finish it on time, right?

Candidate: Yes, the task was to finish it on time.

Interviewer: So what did you do? You must have really pulled out all the stops.

Candidate: I worked extra hours to get my parts done. I tried to tell everyone to work faster.

Interviewer: And the result was a big success, I bet?

Candidate: The project was a bit late, but we eventually finished it. It was a stressful time.

Interviewer: Okay. What about teamwork? So, you'd say you're a great team player who always steps up, right?

Candidate: I try to be.

Interviewer: Have you had disagreements with teammates?

Candidate: A teammate and I weren't agreeing on things once.

Interviewer: And you had to deal with the situation, I'm sure. What did you do?

Candidate: I mostly just tried to avoid them to prevent more arguments. I did my work, and they did theirs.

Interviewer: So you kept things professional and didn't let it escalate?

Candidate: Yes. We didn't argue anymore, but we also didn't collaborate much. The work got done, but it wasn't a great team atmosphere.
`,
    analysis: {
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
            action:
              "I worked extra hours to get my parts done. I tried to tell everyone to work faster.",
            result:
              "The project was a bit late, but we eventually finished it. It was a stressful time.",
          },
          {
            question: "Conflict with a team member",
            situation: "A teammate and I weren't agreeing on things.",
            task: "I had to deal with the situation.",
            action:
              "I mostly just tried to avoid them to prevent more arguments. I did my work, and they did theirs.",
            result:
              "We didn't argue anymore, but we also didn't collaborate much. The work got done, but it wasn't a great team atmosphere.",
          },
        ],
      },
      biasDetection: {
        overallAssessment:
          "A potential 'Leading Question' bias was detected. The interviewer sometimes phrased questions in a way that suggested the desired answer, which may have influenced the candidate's responses.",
        biases: [
          {
            biasType: "Leading Questions",
            description: "Questions that prompt or encourage the desired answer.",
            severity: "Medium",
            example:
              "Interviewer: 'So, you'd say you're a great team player who always steps up, right?'",
          },
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
  },
];

const getIndexFromName = (name: string, arrayLength: number): number => {
  if (!name) return 0;
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % arrayLength;
};

export async function analyzeInterview(candidateName: string): Promise<{
  data: AnalysisResult | null;
  error: string | null;
}> {
  try {
    // Simulate processing time
    await sleep(2000);

    // Deterministically select one of the mock analyses based on candidate name
    const analysisIndex = getIndexFromName(candidateName, MOCK_DATA.length);
    const selectedMock = MOCK_DATA[analysisIndex];

    // Deterministically adjust the score
    const scoreAdjustment = getIndexFromName(candidateName, 6) - 3; // -3 to +2
    const finalScore = Math.min(
      100,
      Math.max(
        0,
        selectedMock.analysis.candidateScore.overallScore + scoreAdjustment
      )
    );

    const finalAnalysis: AnalysisResult = {
      candidateName,
      ...selectedMock.analysis,
      candidateScore: {
        ...selectedMock.analysis.candidateScore,
        overallScore: finalScore,
      },
      transcript: selectedMock.transcript,
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
