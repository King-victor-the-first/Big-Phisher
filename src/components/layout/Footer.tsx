export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} ScamSensei. All rights reserved.</p>
        <p className="mt-1">Stay vigilant, stay safe.</p>
      </div>
    </footer>
  );
}
