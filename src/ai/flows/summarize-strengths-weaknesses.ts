'use server';
/**
 * @fileOverview Summarizes the candidate's strengths and weaknesses.
 *
 * - summarizeStrengthsWeaknesses - A function that handles the summarization process.
 * - SummarizeStrengthsWeaknessesInput - The input type for the summarizeStrengthsWeaknesses function.
 * - SummarizeStrengthsWeaknessesOutput - The return type for the summarizeStrengthsWeaknesses function.
 */

import {z} from 'zod';

const SummarizeStrengthsWeaknessesInputSchema = z.object({
  interviewText: z.string().describe('The transcribed text of the interview.'),
});
export type SummarizeStrengthsWeaknessesInput = z.infer<typeof SummarizeStrengthsWeaknessesInputSchema>;

const SummarizeStrengthsWeaknessesOutputSchema = z.object({
  strengths: z.string().describe("A summary of the candidate's strengths."),
  weaknesses: z.string().describe("A summary of the candidate's weaknesses."),
});
export type SummarizeStrengthsWeaknessesOutput = z.infer<typeof SummarizeStrengthsWeaknessesOutputSchema>;
