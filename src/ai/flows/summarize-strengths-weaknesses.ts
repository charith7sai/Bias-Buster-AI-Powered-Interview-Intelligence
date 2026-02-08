'use server';
/**
 * @fileOverview Summarizes the candidate's strengths and weaknesses.
 *
 * - summarizeStrengthsWeaknesses - A function that handles the summarization process.
 * - SummarizeStrengthsWeaknessesInput - The input type for the summarizeStrengthsWeaknesses function.
 * - SummarizeStrengthsWeaknessesOutput - The return type for the summarizeStrengthsWeaknesses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeStrengthsWeaknessesInputSchema = z.object({
  interviewText: z.string().describe('The transcribed text of the interview.'),
  candidateName: z.string().describe('The name of the candidate.'),
});
export type SummarizeStrengthsWeaknessesInput = z.infer<typeof SummarizeStrengthsWeaknessesInputSchema>;

const SummarizeStrengthsWeaknessesOutputSchema = z.object({
  strengths: z.string().describe('A summary of the candidate\'s strengths.'),
  weaknesses: z.string().describe('A summary of the candidate\'s weaknesses.'),
});
export type SummarizeStrengthsWeaknessesOutput = z.infer<typeof SummarizeStrengthsWeaknessesOutputSchema>;

export async function summarizeStrengthsWeaknesses(input: SummarizeStrengthsWeaknessesInput): Promise<SummarizeStrengthsWeaknessesOutput> {
  return summarizeStrengthsWeaknessesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeStrengthsWeaknessesPrompt',
  input: {schema: SummarizeStrengthsWeaknessesInputSchema},
  output: {schema: SummarizeStrengthsWeaknessesOutputSchema},
  prompt: `You are an expert in evaluating job candidate interviews.  You will be provided with the transcribed text of an interview with {{candidateName}}.  Please analyze the interview text and summarize the candidate\'s key strengths and weaknesses.

Interview Text:
{{interviewText}}

Strengths:
{{output.strengths}}

Weaknesses:
{{output.weaknesses}}`,
});

const summarizeStrengthsWeaknessesFlow = ai.defineFlow(
  {
    name: 'summarizeStrengthsWeaknessesFlow',
    inputSchema: SummarizeStrengthsWeaknessesInputSchema,
    outputSchema: SummarizeStrengthsWeaknessesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
