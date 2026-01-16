import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-border bg-background py-12 mt-24">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">
              Email: <a href="mailto:kdhakshinamoorthy@csus.edu" className="hover:text-foreground transition-colors">kdhakshinamoorthy@csus.edu</a>
            </p>
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
