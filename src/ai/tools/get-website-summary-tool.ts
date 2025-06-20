'use server';
/**
 * @fileOverview Defines a Genkit tool for summarizing website content based on URL structure.
 *
 * - getWebsiteSummaryTool - A Genkit tool that provides a brief summary of a website's content based on its URL.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetWebsiteSummaryInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to summarize.'),
});

const GetWebsiteSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A brief, objective summary of the website content and its main purpose inferred from the URL structure (e.g., "This URL appears to be for an e-commerce site selling electronics."). If the URL does not provide enough information to infer content or seems generic/parked, state that clearly.'
    ),
});

// This prompt is internal to the tool's implementation
const summarizeUrlPrompt = ai.definePrompt({
  name: 'summarizeUrlForToolPrompt',
  input: {schema: GetWebsiteSummaryInputSchema},
  output: {schema: GetWebsiteSummaryOutputSchema},
  prompt: `Based *solely* on the provided URL structure (domain, path, query parameters), provide a brief, objective summary of the likely website content and its main purpose.
URL: {{{url}}}

Examples of inference:
- If URL is 'www.techgadgetstore.com/products/new-smartphones', summary might be: "This URL suggests an e-commerce website focused on tech gadgets, specifically new smartphones."
- If URL is 'www.dailyfoodrecipes.net/chicken-pasta-bake', summary might be: "This URL points to a website likely offering food recipes, with this specific page about a chicken pasta bake."
- If URL is 'www.generic-domain-placeholder123.com', summary might be: "Unable to determine specific content from the URL; this may be a parked domain or a generic placeholder site."
- If URL is 'http://123.45.67.89/login.php', summary might be: "This URL appears to be a login page. The specific content or service behind the login cannot be determined from the URL alone."

Do NOT attempt to access the internet or external websites. Your summary must be an inference derived from the components of the URL itself. If you cannot make a reasonable inference about the specific purpose or content, state: "Unable to determine specific website content or purpose from the URL structure alone."
Focus on factual inference, not on safety or suspicion.
`,
});

export const getWebsiteSummaryTool = ai.defineTool(
  {
    name: 'getWebsiteSummaryTool',
    description:
      "Infers and provides a brief, objective summary of a website's likely content and purpose based SOLELY on its URL structure. It does not access the internet. Use this to get an idea of what a website might be about before explaining its potential risks.",
    inputSchema: GetWebsiteSummaryInputSchema,
    outputSchema: GetWebsiteSummaryOutputSchema,
  },
  async input => {
    const {output} = await summarizeUrlPrompt(input);
    if (!output) {
        return { summary: "Unable to generate a summary for this URL based on its structure." };
    }
    return output;
  }
);
