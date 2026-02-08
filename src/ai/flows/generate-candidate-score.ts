'use server';

/**
 * @fileOverview A Genkit flow to generate an overall candidate score based on the STAR analysis.
 *
 * - generateCandidateScore - A function that generates the candidate score.
 * - GenerateCandidateScoreInput - The input type for the generateCandidateScore function.
 * - GenerateCandidateScoreOutput - The return type for the generateCandidateScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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

export async function generateCandidateScore(
  input: GenerateCandidateScoreInput
): Promise<GenerateCandidateScoreOutput> {
  return generateCandidateScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCandidateScorePrompt',
  input: {schema: GenerateCandidateScoreInputSchema},
  output: {schema: GenerateCandidateScoreOutputSchema},
  prompt: `You are an expert recruiter tasked with evaluating candidates based on their STAR analysis.

  Based on the provided STAR analysis, generate an overall candidate score (out of 100), identify the candidate's strengths, and provide suggestions for improvement.

  STAR Analysis: {{{starAnalysis}}}

  Respond concisely and directly.

  Output:
  - overallScore: The overall candidate score (out of 100).
  - strengths: A summary of the candidate's strengths.
  - improvements: Suggestions for improvement for the candidate.
  `,
});

const generateCandidateScoreFlow = ai.defineFlow(
  {
    name: 'generateCandidateScoreFlow',
    inputSchema: GenerateCandidateScoreInputSchema,
    outputSchema: GenerateCandidateScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
