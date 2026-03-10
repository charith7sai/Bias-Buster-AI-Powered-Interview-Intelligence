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
    transcript: `Interviewer: Good morning! Thanks for joining us today. To kick things off, can you tell me about a time you had to lead a team through a high-pressure situation?

Candidate: Good morning. Absolutely. In my last role at Spark Systems, we had a critical server migration scheduled for a weekend. Twelve hours before the cutover, our lead engineer fell ill. I had to step up and coordinate the final testing phases while keeping the stakeholders informed.

Interviewer: That sounds intense. What was the specific outcome of your leadership during that window?

Candidate: I organized a rapid knowledge transfer session between the remaining team members and divided the remaining tasks into smaller, manageable chunks. We successfully completed the migration four hours ahead of the scheduled launch time. Our downtime was zero percent, which was better than the projected two percent. The client rewarded the team with a formal commendation for our adaptability.

Interviewer: Excellent. Now, how do you handle direct disagreement with a superior?

Candidate: I believe in constructive friction. Once, my manager proposed a UI overhaul that I felt would negatively impact our accessibility compliance. I didn't just say 'no'; I prepared a visual report showing the contrast issues and proposed an alternative palette that achieved his aesthetic goals while meeting WCAG AA standards.

Interviewer: And what happened after you presented that?

Candidate: He appreciated the data-driven approach. We adopted the alternative palette, and after launch, our accessibility score actually increased by 15 points. It taught me that presenting solutions, not just problems, is key to professional disagreement.`,
    analysis: {
      starAnalysis: {
        overallRating: "Outstanding",
        strengths: "Exceptionally strong leadership and problem-solving skills. Consistently uses data to support decisions and communicates with high clarity.",
        improvements: "Could focus on delegating earlier in the process to avoid bottlenecking critical knowledge.",
        starScores: {
          "High-pressure leadership": 5,
          "Professional disagreement": 5,
        },
        starBreakdowns: [
          {
            question: "High-pressure leadership",
            situation: "A lead engineer fell ill right before a massive, high-stakes server migration at Spark Systems.",
            task: "As the project lead, I had to ensure the migration proceeded without errors despite the loss of our primary technical resource.",
            action: "I conducted emergency knowledge shares, restructured the task list, and maintained constant communication with clients.",
            result: "Migration finished 4 hours early with zero downtime, earning a client commendation.",
          },
          {
            question: "Professional disagreement",
            situation: "My manager wanted a design change that would have broken accessibility laws.",
            task: "I needed to steer the project toward compliance without undermining my manager's vision.",
            action: "I produced a comparative data report and offered a middle-ground solution that satisfied both design and legal requirements.",
            result: "The alternative was adopted, and accessibility scores improved by 15 points post-launch.",
          }
        ],
      },
      biasDetection: {
        overallAssessment: "The interview was conducted with high professional standards. The questions were focused on behavioral evidence and outcomes.",
        biases: [],
      },
      candidateScore: {
        overallScore: 94,
        strengths: "- High emotional intelligence\n- Data-driven decision making\n- Proven leadership under duress",
        improvements: "- Explore advanced project management certifications",
      },
    },
  },
  {
    transcript: `Interviewer: Hi there. Let's get right to it. Tell me about a time you failed to meet a deadline.

Candidate: Hi. Well, at my previous internship, I was tasked with writing a market research report. I underestimated how long the data cleaning would take, and I missed the initial draft deadline by two days.

Interviewer: I see. Missing deadlines is never ideal. What did you do to fix the situation?

Candidate: As soon as I realized I was behind, I notified my supervisor. I worked late for two nights to finish the draft and then built a more realistic buffer into my next two assignments to ensure it didn't happen again.

Interviewer: And the final report? Was it successful?

Candidate: Yes, the final version was delivered on time for the client meeting. They found the insights useful for their Q4 planning, but I definitely learned that early communication is better than a late apology.

Interviewer: Okay. How do you deal with a difficult colleague?

Candidate: I try to find common ground. I once worked with a developer who was very blunt. I realized they just valued efficiency over small talk. I adjusted my communication to be more concise and focused on the 'bottom line' when talking to them.

Interviewer: Did that change the dynamic?

Candidate: It did. Our work together became much faster, and they eventually started asking for my input on design early on because they knew I'd get straight to the point.`,
    analysis: {
      starAnalysis: {
        overallRating: "Solid",
        strengths: "Good accountability and self-awareness. Shows an ability to learn from mistakes and adapt communication styles to fit different personalities.",
        improvements: "Needs to provide more specific metrics of success in their examples. The 'STAR' structure is present but could be more detailed.",
        starScores: {
          "Missing a deadline": 3,
          "Dealing with a difficult colleague": 4,
        },
        starBreakdowns: [
          {
            question: "Missing a deadline",
            situation: "I underestimated the complexity of data cleaning for a market research report during an internship.",
            task: "I had to complete the report while managing expectations with my supervisor.",
            action: "I communicated the delay early and worked overtime to minimize the impact.",
            result: "The final report was delivered on time for the client, and I implemented new time-tracking habits.",
          },
          {
            question: "Dealing with a difficult colleague",
            situation: "A coworker's blunt communication style was causing friction in our daily interactions.",
            task: "I needed to improve our working relationship to maintain team efficiency.",
            action: "I mirrored their direct communication style and focused purely on technical requirements.",
            result: "Productivity increased, and a mutual professional respect was established.",
          }
        ],
      },
      biasDetection: {
        overallAssessment: "Mostly objective, though the first question ('Missing deadlines is never ideal') contained a slight negative framing that could influence candidate confidence.",
        biases: [
          {
            biasType: "Framing Effect",
            description: "The interviewer used negative framing in the follow-up, which can subconsciously pressure the candidate to be overly defensive.",
            severity: "Low",
            example: "Interviewer: 'Missing deadlines is never ideal.'",
          }
        ],
      },
      candidateScore: {
        overallScore: 78,
        strengths: "- High level of accountability\n- Adaptable communication style",
        improvements: "- Practice quantifying the impact of actions with data\n- Provide more complex examples of problem-solving",
      },
    },
  },
  {
    transcript: `Interviewer: Welcome! It's great to have you. Tell me about a project you're particularly proud of.

Candidate: Thank you. I'm really proud of the 'Eco-Tracker' app I built as a side project. It helps users track their carbon footprint based on their shopping habits.

Interviewer: That sounds fascinating. What was your specific role in that?

Candidate: I was the sole developer and designer. I had to integrate a barcode scanning API with a database of carbon impact scores for over 50,000 products.

Interviewer: What was the biggest hurdle you faced?

Candidate: The database was very messy. I had to write custom scripts to normalize the data and ensure the scanning was fast. I optimized the queries to reduce lookup time from 3 seconds to under 200 milliseconds.

Interviewer: And what's the status of the app now?

Candidate: I released it on the App Store last month. It currently has 500 active users and a 4.8-star rating. I'm currently working on a version that allows users to 'offset' their footprint through local tree-planting initiatives.

Interviewer: That's great. Have you ever had to work in a team where someone wasn't pulling their weight?

Candidate: Yes, in a university capstone project. One member was consistently missing meetings. I decided to take a supportive approach rather than an accusatory one. I asked if they were overwhelmed and helped them re-scope their portion of the project.

Interviewer: And did they step up?

Candidate: They did. It turned out they were struggling with the specific framework we were using. After a few pair-programming sessions, they were able to contribute their share, and we got an 'A' on the project.`,
    analysis: {
      starAnalysis: {
        overallRating: "Very Good",
        strengths: "Strong technical initiative and a proactive, empathetic approach to teamwork. Demonstrates high ownership of end-to-end product development.",
        improvements: "Could benefit from more professional environment examples, as side projects and university work have lower stakes.",
        starScores: {
          "Proudest project": 5,
          "Team conflict": 4,
        },
        starBreakdowns: [
          {
            question: "Proudest project",
            situation: "I wanted to build a tool that made environmental impact tangible for everyday shoppers.",
            task: "I needed to design and develop a full-stack mobile app with a high-performance database lookup.",
            action: "I optimized database queries (3s to 200ms) and integrated a complex scanning API.",
            result: "App launched with 500 active users and a 4.8-star rating.",
          },
          {
            question: "Team conflict",
            situation: "A team member was disengaged during a critical university capstone project.",
            task: "I had to ensure the project met its goals without letting the team dynamic sour.",
            action: "I checked in with the individual, identified a technical knowledge gap, and provided mentorship.",
            result: "The member successfully contributed, and the team received an 'A' grade.",
          }
        ],
      },
      biasDetection: {
        overallAssessment: "The interview was highly encouraging and positive. No significant biases were detected.",
        biases: [],
      },
      candidateScore: {
        overallScore: 86,
        strengths: "- High technical proficiency\n- Empathetic leadership style\n- Strong entrepreneurial drive",
        improvements: "- Focus on gaining more experience in enterprise-scale environments",
      },
    },
  },
];

const getIndexFromName = (name: string, arrayLength: number): number => {
  if (!name) return 0;
  let hash = 0;
  const lowerName = name.trim().toLowerCase();
  for (let i = 0; i < lowerName.length; i++) {
    hash = (hash << 5) - hash + lowerName.charCodeAt(i);
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
    await sleep(2500);

    // Deterministically select one of the mock analyses based on candidate name
    const analysisIndex = getIndexFromName(candidateName, MOCK_DATA.length);
    const selectedMock = MOCK_DATA[analysisIndex];

    // Deterministically adjust the score slightly based on the name hash
    const scoreAdjustment = (getIndexFromName(candidateName, 11) - 5); // -5 to +5
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
