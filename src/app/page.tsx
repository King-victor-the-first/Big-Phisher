import PhishingCheckerForm from '@/components/PhishingCheckerForm';
import { ScanSearch } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-12">
      <section className="text-center mb-10 md:mb-16">
        <div className="inline-block p-4 bg-primary/10 rounded-full mb-6 shadow-md">
          <ScanSearch className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-4">
          Is It a Scam? Let Big Phisher Check!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Paste any suspicious URL or message below. Our AI will analyze it for potential phishing threats and give you a detailed report. Stay safe online!
        </p>
      </section>
      
      <PhishingCheckerForm />

      <section className="mt-12 md:mt-20 w-full max-w-3xl text-center p-6 bg-card rounded-lg shadow-lg border border-border">
        <h2 className="text-2xl font-headline font-semibold text-primary mb-3">Why Use Big Phisher?</h2>
        <p className="text-muted-foreground">
          Phishing attacks are becoming more sophisticated. Big Phisher uses advanced AI and threat intelligence to help you identify malicious links and messages before they can cause harm. Protect your personal information and browse with confidence.
        </p>
      </section>
    </div>
  );
}
