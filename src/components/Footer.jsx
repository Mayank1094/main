import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer 
      // py-6 and mt-8 for smaller padding/margin on mobile (default)
      // md:py-12 and md:mt-12 to restore original, larger spacing on medium screens and up
      className="py-6 px-4 bg-card relative border-t border-border mt-8 pt-8 flex flex-wrap justify-between items-center md:py-12 md:mt-12"
    >
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Mayank. All rights reserved.
      </p>
      <a
        href="#hero"
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};
