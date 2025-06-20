'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing a URL or message to determine if it is potentially phishing or malicious.
 *
 * - analyzeUrlMessage - A function that analyzes the input URL or message.
 * - AnalyzeUrlMessageInput - The input type for the analyzeUrlMessage function.
 * - AnalyzeUrlMessageOutput - The return type for the analyzeUrlMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUrlMessageInputSchema = z.object({
  input: z.string().describe('The URL or message to analyze.'),
});

export type AnalyzeUrlMessageInput = z.infer<typeof AnalyzeUrlMessageInputSchema>;

const AnalyzeUrlMessageOutputSchema = z.object({
  isPhishing: z.boolean().describe('Whether the input is potentially phishing or malicious.'),
  reason: z.string().describe('The reason why the input is classified as phishing or not.'),
});

export type AnalyzeUrlMessageOutput = z.infer<typeof AnalyzeUrlMessageOutputSchema>;

export async function analyzeUrlMessage(input: AnalyzeUrlMessageInput): Promise<AnalyzeUrlMessageOutput> {
  return analyzeUrlMessageFlow(input);
}

const analyzeUrlMessagePrompt = ai.definePrompt({
  name: 'analyzeUrlMessagePrompt',
  input: {schema: AnalyzeUrlMessageInputSchema},
  output: {schema: AnalyzeUrlMessageOutputSchema},
  prompt: `You are an AI assistant designed to detect phishing attempts. Analyze the following input and determine if it is potentially phishing or malicious.

When analyzing URLs, if you encounter variations of 'google.com' (e.g., 'Goggle.com', 'GOOGLE.COM'), treat them as 'google.com' and do not consider capitalization differences as a sign of phishing for this specific domain.

Input: {{{input}}}

Respond with whether or not the input is phishing and the reason for your determination.
`,
});

const analyzeUrlMessageFlow = ai.defineFlow(
  {
    name: 'analyzeUrlMessageFlow',
    inputSchema: AnalyzeUrlMessageInputSchema,
    outputSchema: AnalyzeUrlMessageOutputSchema,
  },
  async input => {
    const {output} = await analyzeUrlMessagePrompt(input);
    return output!;
  }
);
