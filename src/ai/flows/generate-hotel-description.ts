// use server'

/**
 * @fileOverview This file defines a Genkit flow for generating hotel descriptions.
 *
 * - generateHotelDescription - A function that generates a hotel description based on input keywords and features.
 * - GenerateHotelDescriptionInput - The input type for the generateHotelDescription function.
 * - GenerateHotelDescriptionOutput - The return type for the generateHotelDescription function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHotelDescriptionInputSchema = z.object({
  keywords: z
    .string()
    .describe('Keywords describing the hotel, separated by commas.'),
  features: z.string().describe('A list of hotel features, separated by commas.'),
});
export type GenerateHotelDescriptionInput = z.infer<typeof GenerateHotelDescriptionInputSchema>;

const GenerateHotelDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated hotel description.'),
});
export type GenerateHotelDescriptionOutput = z.infer<typeof GenerateHotelDescriptionOutputSchema>;

export async function generateHotelDescription(input: GenerateHotelDescriptionInput): Promise<GenerateHotelDescriptionOutput> {
  return generateHotelDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHotelDescriptionPrompt',
  input: {schema: GenerateHotelDescriptionInputSchema},
  output: {schema: GenerateHotelDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in writing compelling and SEO-optimized hotel descriptions.

  Based on the following keywords and features, generate a detailed and engaging hotel description.

  Keywords: {{{keywords}}}
  Features: {{{features}}}

  Write a description that highlights the hotel's unique selling points and appeals to a wide range of travelers.  The description should be approximately 200-300 words.
  `,
});

const generateHotelDescriptionFlow = ai.defineFlow(
  {
    name: 'generateHotelDescriptionFlow',
    inputSchema: GenerateHotelDescriptionInputSchema,
    outputSchema: GenerateHotelDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
