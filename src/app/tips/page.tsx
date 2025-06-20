import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Lightbulb, ShieldQuestion, ExternalLink, UserCheck, RotateCcw } from "lucide-react";

const phishingTips = [
  {
    id: "tip-1",
    icon: <ShieldQuestion className="w-5 h-5 text-primary" />,
    title: "Verify the Source",
    content: "Always double-check the sender's email address or phone number. Scammers often use addresses that look similar to legitimate ones but have slight variations. If you're unsure, contact the organization directly through their official website or phone number, not by replying to the suspicious message.",
  },
  {
    id: "tip-2",
    icon: <ExternalLink className="w-5 h-5 text-primary" />,
    title: "Inspect URLs Carefully",
    content: "Hover over links before clicking to see the actual destination URL. Look for misspellings in domain names (e.g., 'paypa1.com' instead of 'paypal.com'). Be wary of shortened URLs, especially from unknown sources. HTTPS is good, but doesn't guarantee a site is safe from phishing.",
  },
  {
    id: "tip-3",
    icon: <UserCheck className="w-5 h-5 text-primary" />,
    title: "Beware of Urgent Requests & Threats",
    content: "Phishing messages often try to create a sense of urgency or fear, like threatening to close your account or claiming you've won a prize that expires soon. Legitimate organizations rarely pressure you into immediate action for sensitive information.",
  },
  {
    id: "tip-4",
    icon: <RotateCcw className="w-5 h-5 text-primary" />,
    title: "Don't Give Up Personal Information",
    content: "Never provide passwords, credit card numbers, social security numbers, or other sensitive information in response to an unsolicited email, text, or phone call. Legitimate companies will not ask for this information via these channels.",
  },
  {
    id: "tip-5",
    icon: <Lightbulb className="w-5 h-5 text-primary" />,
    title: "Look for Poor Grammar and Spelling",
    content: "Many phishing messages originate from non-native English speakers and may contain obvious grammatical errors, awkward phrasing, or misspellings. While some are sophisticated, this can be a red flag.",
  },
  {
    id: "tip-6",
    icon: <UserCheck className="w-5 h-5 text-primary" />,
    title: "Use Multi-Factor Authentication (MFA)",
    content: "Enable MFA on all your important accounts. Even if a scammer gets your password, MFA provides an additional layer of security, making it harder for them to access your account.",
  },
  {
    id: "tip-7",
    icon: <ShieldQuestion className="w-5 h-5 text-primary" />,
    title: "Be Cautious with Attachments",
    content: "Avoid opening unexpected attachments, especially from unknown senders. These can contain malware. If you receive an attachment you weren't expecting, verify with the sender through a separate communication channel.",
  },
];

export default function TipsPage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="text-center mb-10">
        <Lightbulb className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-headline font-bold text-foreground mb-3">Phishing Awareness Tips</h1>
        <p className="text-lg text-muted-foreground">
          Learn how to spot and avoid phishing scams. Knowledge is your best defense!
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {phishingTips.map((tip) => (
          <AccordionItem value={tip.id} key={tip.id} className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-left hover:no-underline [&[data-state=open]>svg]:text-primary">
              <div className="flex items-center gap-3">
                {tip.icon}
                <span className="font-headline">{tip.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 pt-0 text-base text-muted-foreground leading-relaxed">
              {tip.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 p-6 bg-primary/10 rounded-lg text-center border border-primary/20">
        <h3 className="text-xl font-headline font-semibold text-primary mb-2">Stay Alert!</h3>
        <p className="text-foreground">
          Phishing techniques are always evolving. Stay informed and always think twice before clicking or sharing information. If something feels off, it probably is. Use ScamSensei to check suspicious links and messages.
        </p>
      </div>
    </div>
  );
}
