'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Search } from 'lucide-react';
import { performAnalysis, type AnalysisResult } from '@/app/actions';
import ResultsDisplay from './ResultsDisplay';

const PhishingInputSchema = z.object({
  text: z.string()
    .min(10, "Input must be at least 10 characters long.")
    .max(2000, "Input must be at most 2000 characters long."),
});
type PhishingInput = z.infer<typeof PhishingInputSchema>;

export default function PhishingCheckerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const form = useForm<PhishingInput>({
    resolver: zodResolver(PhishingInputSchema),
    defaultValues: {
      text: '',
    },
  });

  const onSubmit: SubmitHandler<PhishingInput> = async (data) => {
    setIsLoading(true);
    setAnalysisResult(null); 
    try {
      const result = await performAnalysis(data.text);
      if ('error' in result) {
        toast({
          variant: 'destructive',
          title: 'Analysis Error',
          description: result.error,
        });
        setAnalysisResult(null);
      } else {
        setAnalysisResult(result);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: 'An unexpected error occurred. Please try again.',
      });
      setAnalysisResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="text-input" className="text-lg font-semibold">Enter URL or Message</FormLabel>
                <FormControl>
                  <Textarea
                    id="text-input"
                    placeholder="e.g., http://example.com or 'Congratulations! You've won...'"
                    className="min-h-[120px] text-base resize-none shadow-sm focus:ring-2 focus:ring-primary-foreground"
                    aria-label="URL or message to analyze"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-transform transform hover:scale-105" 
            disabled={isLoading}
            aria-live="polite"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="mr-2 h-6 w-6" />
                Check for Phishing
              </>
            )}
          </Button>
        </form>
      </Form>

      {analysisResult && (
        <div className="mt-8">
          <ResultsDisplay result={analysisResult} />
        </div>
      )}
    </div>
  );
}
