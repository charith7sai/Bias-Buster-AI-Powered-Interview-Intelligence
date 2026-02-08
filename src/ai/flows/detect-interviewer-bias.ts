'use server';
/**
 * @fileOverview This file defines a Genkit flow for detecting interviewer bias in interview transcripts.
 *
 * The flow analyzes the interview transcript to identify potential biases such as leading questions,
 * speaking time imbalance, interruptions, and sentiment/tone bias.
 *
 * @interface DetectInterviewerBiasInput - The input to the detectInterviewerBias function.
 * @interface DetectInterviewerBiasOutput - The output of the detectInterviewerBias function.
 */

import {z} from 'zod';

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
