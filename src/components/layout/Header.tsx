import Link from 'next/link';
import { ShieldAlert, Home, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <ShieldAlert className="w-8 h-8" />
          <h1 className="text-2xl font-headline font-semibold">ScamSensei</h1>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-1 text-sm sm:text-base">
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              Checker
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/tips" className="flex items-center gap-1 text-sm sm:text-base">
              <Info className="w-4 h-4 sm:w-5 sm:h-5" />
              Tips
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
