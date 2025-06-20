'use server';
import { analyzeUrlMessage, type AnalyzeUrlMessageInput, type AnalyzeUrlMessageOutput } from '@/ai/flows/analyze-url-message';
import { explainSuspiciousUrl, type ExplainSuspiciousUrlInput, type ExplainSuspiciousUrlOutput } from '@/ai/flows/explain-suspicious-url';

export type AnalysisResult = {
  analysis: AnalyzeUrlMessageOutput;
  explanation: ExplainSuspiciousUrlOutput;
  input: string;
};

export async function performAnalysis(inputText: string): Promise<AnalysisResult | { error: string }> {
  if (!inputText || inputText.trim().length < 10) {
    return { error: "Input text is too short. Please provide at least 10 characters." };
  }
  if (inputText.trim().length > 2000) {
    return { error: "Input text is too long. Please limit to 2000 characters." };
  }

  try {
    const analyzeInput: AnalyzeUrlMessageInput = { input: inputText };
    const analysisResult = await analyzeUrlMessage(analyzeInput);

    const explainInput: ExplainSuspiciousUrlInput = {
      urlOrMessage: inputText,
      isPhishing: analysisResult.isPhishing,
      safeBrowsingResult: analysisResult.reason, 
    };
    const explanationResult = await explainSuspiciousUrl(explainInput);

    return {
      analysis: analysisResult,
      explanation: explanationResult,
      input: inputText,
    };
  } catch (err) {
    console.error("Error during analysis:", err);
    // Check if err is an instance of Error to safely access err.message
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
    return { error: `An error occurred during analysis: ${errorMessage}. Please try again.` };
  }
}
