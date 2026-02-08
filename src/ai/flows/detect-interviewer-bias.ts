'use server';
/**
 * @fileOverview This file defines a Genkit flow for detecting interviewer bias in interview transcripts.
 *
 * The flow analyzes the interview transcript to identify potential biases such as leading questions,
 * speaking time imbalance, interruptions, and sentiment/tone bias.
 *
 * @interface DetectInterviewerBiasInput - The input to the detectInterviewerBias function.
 * @interface DetectInterviewerBiasOutput - The output of the detectInterviewerBias function.
 * @function detectInterviewerBias - The main function that triggers the interviewer bias detection flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectInterviewerBiasInputSchema = z.object({
  transcript: z.string().describe('The full transcript of the interview.'),
});
export type DetectInterviewerBiasInput = z.infer<typeof DetectInterviewerBiasInputSchema>;

const BiasDetectionResultSchema = z.object({
  biasType: z.string().describe('The type of bias detected (e.g., Leading Questions, Speaking Time Imbalance).'),
  description: z.string().describe('A detailed description of the bias and where it occurs in the transcript.'),
  severity: z.string().describe('The severity of the bias (e.g., Low, Medium, High).'),
  example: z.string().optional().describe('An example of the bias from the transcript.'),
});

const DetectInterviewerBiasOutputSchema = z.object({
  overallAssessment: z.string().describe('An overall assessment of interviewer bias in the interview.'),
  biases: z.array(BiasDetectionResultSchema).describe('A list of specific biases detected in the interview.'),
});
export type DetectInterviewerBiasOutput = z.infer<typeof DetectInterviewerBiasOutputSchema>;

export async function detectInterviewerBias(input: DetectInterviewerBiasInput): Promise<DetectInterviewerBiasOutput> {
  return detectInterviewerBiasFlow(input);
}

const detectInterviewerBiasPrompt = ai.definePrompt({
  name: 'detectInterviewerBiasPrompt',
  input: {schema: DetectInterviewerBiasInputSchema},
  output: {schema: DetectInterviewerBiasOutputSchema},
  prompt: `You are an AI expert in analyzing interview transcripts to detect interviewer bias.

  Analyze the following interview transcript for potential biases.  Provide specific examples from the transcript where possible.

  Types of bias to look for include:
  - Leading questions: Questions that subtly suggest the desired answer.
  - Speaking time imbalance: Significant differences in speaking time between the interviewer and candidate.
  - Interruptions: The interviewer frequently interrupting the candidate.
  - Sentiment/tone bias: Displaying different sentiment or tone towards the candidate's responses.

  Transcript:
  {{transcript}}

  Provide an overall assessment of interviewer bias, as well as a list of specific biases detected, their descriptions, and severity.  If no biases are found, clearly state that.
  `,
});

const detectInterviewerBiasFlow = ai.defineFlow(
  {
    name: 'detectInterviewerBiasFlow',
    inputSchema: DetectInterviewerBiasInputSchema,
    outputSchema: DetectInterviewerBiasOutputSchema,
  },
  async input => {
    const {output} = await detectInterviewerBiasPrompt(input);
    return output!;
  }
);
