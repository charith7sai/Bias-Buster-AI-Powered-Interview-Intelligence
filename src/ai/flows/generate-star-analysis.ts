'use server';

/**
 * @fileOverview Flow to analyze candidate responses based on the STAR framework.
 *
 * - generateStarAnalysis - Analyzes interview responses using the STAR framework.
 * - StarAnalysisInput - The input type for the generateStarAnalysis function.
 * - StarAnalysisOutput - The return type for the generateStarAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StarAnalysisInputSchema = z.object({
  interviewText: z
    .string()
    .describe('The full transcript of the interview including interviewer and candidate speech.'),
  candidateName: z.string().describe('The name of the candidate being interviewed.'),
  jobDescription: z.string().describe('The job description for the role.'),
});
export type StarAnalysisInput = z.infer<typeof StarAnalysisInputSchema>;

const StarAnalysisOutputSchema = z.object({
  overallRating: z.string().describe('An overall rating of the candidate based on their STAR responses.'),
  strengths: z.string().describe('A summary of the candidate\'s strengths.'),
  improvements: z.string().describe('Suggestions for improvement for the candidate.'),
  starScores: z
    .record(z.string(), z.number())
    .describe('A record of STAR scores for each question, with question as key and score as value.'),
});
export type StarAnalysisOutput = z.infer<typeof StarAnalysisOutputSchema>;

export async function generateStarAnalysis(input: StarAnalysisInput): Promise<StarAnalysisOutput> {
  return generateStarAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'starAnalysisPrompt',
  input: {schema: StarAnalysisInputSchema},
  output: {schema: StarAnalysisOutputSchema},
  prompt: `You are an expert interview analyzer, skilled in evaluating candidates based on the STAR framework (Situation, Task, Action, Result).

  Analyze the following interview transcript for {{candidateName}}, applying for the role described below.  Provide an overall rating, a summary of the candidate\'s strengths and areas for improvement, and a STAR score for each question.

  Job Description:
  {{jobDescription}}

  Interview Transcript:
  {{interviewText}}

  Format your response as a JSON object with the following keys:
  - overallRating: An overall rating of the candidate (e.g., Excellent, Good, Fair, Poor).
  - strengths: A summary of the candidate\'s key strengths demonstrated in the interview.
  - improvements: Specific and actionable suggestions for the candidate to improve their interview responses.
  - starScores: A record of STAR scores for each question, with the question as the key and the score (out of 5) as the value. Each question should be rated based on how well it addresses Situation, Task, Action and Result.
  \nMake sure the starScores field has a score for each question that the candidate answered, even if only partial STAR elements were discussed.
`,
});

const generateStarAnalysisFlow = ai.defineFlow(
  {
    name: 'generateStarAnalysisFlow',
    inputSchema: StarAnalysisInputSchema,
    outputSchema: StarAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
