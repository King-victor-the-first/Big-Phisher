import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, ShieldX, AlertTriangle, Info, MessageSquareQuote } from 'lucide-react';
import type { AnalysisResult } from '@/app/actions';

interface ResultsDisplayProps {
  result: AnalysisResult;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const { analysis, explanation, input } = result;
  const isPhishing = analysis.isPhishing;

  const statusConfig = isPhishing
    ? {
        title: "Potential Threat Detected!",
        icon: <ShieldX className="w-12 h-12 text-destructive" />,
        cardClass: "border-destructive bg-destructive/5 text-destructive-foreground shadow-lg",
        titleClass: "text-destructive",
        badgeText: "Dangerous",
        badgeClass: "bg-destructive text-destructive-foreground",
      }
    : {
        title: "Looks Safe!",
        icon: <ShieldCheck className="w-12 h-12 text-green-600" />,
        cardClass: "border-green-600 bg-green-500/5 text-green-700 shadow-lg",
        titleClass: "text-green-700",
        badgeText: "Safe",
        badgeClass: "bg-green-600 text-white",
      };

  return (
    <Card className={`w-full ${statusConfig.cardClass} transition-all duration-500 ease-in-out transform hover:shadow-xl`}>
      <CardHeader className="text-center">
        <div className="flex justify-center items-center mb-4">
          {statusConfig.icon}
        </div>
        <CardTitle className={`text-3xl font-headline font-bold ${statusConfig.titleClass}`}>
          {statusConfig.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mt-1">
          Analysis for: <span className="font-medium break-all">&quot;{input.length > 100 ? `${input.substring(0,100)}...` : input}&quot;</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 bg-card rounded-lg shadow">
            <h3 className="text-lg font-semibold text-foreground flex items-center mb-2">
              <AlertTriangle className="w-5 h-5 mr-2 text-accent" />
              Initial Assessment
            </h3>
            <p className="text-foreground/90">{analysis.reason || "No specific reason provided by initial assessment."}</p>
        </div>

        <div className="p-4 bg-card rounded-lg shadow">
          <h3 className="text-lg font-semibold text-foreground flex items-center mb-2">
            <Info className="w-5 h-5 mr-2 text-primary" />
            Detailed Explanation
          </h3>
          <p className="text-foreground/90 whitespace-pre-wrap">{explanation.explanation || "No detailed explanation available."}</p>
        </div>
        
        {isPhishing && (
           <div className="p-4 border border-accent/50 bg-accent/10 rounded-lg shadow">
             <h3 className="text-lg font-semibold text-accent-foreground flex items-center mb-2">
               <MessageSquareQuote className="w-5 h-5 mr-2 text-accent" />
               Recommendation
             </h3>
             <p className="text-accent-foreground/90">
               This content shows signs of being malicious. We strongly advise against interacting with it. Do not click any links, download attachments, or provide any personal information.
             </p>
           </div>
        )}
         {!isPhishing && (
           <div className="p-4 border border-green-500/50 bg-green-500/10 rounded-lg shadow">
             <h3 className="text-lg font-semibold text-green-700 flex items-center mb-2">
               <MessageSquareQuote className="w-5 h-5 mr-2 text-green-600" />
               Recommendation
             </h3>
             <p className="text-green-700/90">
                While this content appears to be safe based on our analysis, always exercise caution. Verify senders, check URLs carefully, and be wary of unexpected requests for information.
             </p>
           </div>
        )}
      </CardContent>
    </Card>
  );
}
