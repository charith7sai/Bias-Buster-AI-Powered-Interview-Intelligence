'use server';

/**
 * @fileOverview Flow to analyze candidate responses based on the STAR framework.
 *
 * - generateStarAnalysis - Analyzes interview responses using the STAR framework.
 * - StarAnalysisInput - The input type for the generateStarAnalysis function.
 * - StarAnalysisOutput - The return type for the generateStarAnalysis function.
 */

import {z} from 'zod';

const StarAnalysisInputSchema = z.object({
  interviewText: z
    .string()
    .describe('The full transcript of the interview including interviewer and candidate speech.'),
});
export type StarAnalysisInput = z.infer<typeof StarAnalysisInputSchema>;

const StarAnalysisOutputSchema = z.object({
  overallRating: z.string().describe('An overall rating of the candidate based on their STAR responses.'),
  strengths: z.string().describe("A summary of the candidate's strengths."),
  improvements: z.string().describe('Suggestions for improvement for the candidate.'),
  starScores: z
    .record(z.string(), z.number())
    .describe('A record of STAR scores for each question, with question as key and score as value.'),
});
export type StarAnalysisOutput = z.infer<typeof StarAnalysisOutputSchema>;
