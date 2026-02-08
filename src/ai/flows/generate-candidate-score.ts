'use server';

/**
 * @fileOverview A Genkit flow to generate an overall candidate score based on the STAR analysis.
 *
 * - generateCandidateScore - A function that generates the candidate score.
 * - GenerateCandidateScoreInput - The input type for the generateCandidateScore function.
 * - GenerateCandidateScoreOutput - The return type for the generateCandidateScore function.
 */

import {z} from 'zod';

const GenerateCandidateScoreInputSchema = z.object({
  starAnalysis: z
    .string()
    .describe(
      'The STAR analysis of the candidate responses, including Situation, Task, Action, and Result details.'
    ),
});
export type GenerateCandidateScoreInput = z.infer<typeof GenerateCandidateScoreInputSchema>;

const GenerateCandidateScoreOutputSchema = z.object({
  overallScore: z
    .number()
    .describe('The overall candidate score based on the STAR analysis.'),
  strengths: z.string().describe('The strengths of the candidate.'),
  improvements: z.string().describe('Suggestions for improvement for the candidate.'),
});
export type GenerateCandidateScoreOutput = z.infer<typeof GenerateCandidateScoreOutputSchema>;
