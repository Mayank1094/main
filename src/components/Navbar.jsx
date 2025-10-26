import { cn } from "@/lib/utils";
// Added Sun and Moon for the Dark Mode Toggle
import { Menu, X, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Placeholder state for theme, assuming you have this logic elsewhere
  const [isDarkMode, setIsDarkMode] = useState(true); 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler for the placeholder theme toggle
  const toggleTheme = () => {
      // In a real app, this would change Tailwind/CSS theme classes or context
      setIsDarkMode(prev => !prev);
  }

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground"> </span> Portfolio
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>
        
        {/* Buttons Grouping (FIXED: ensures vertical alignment) */}
        <div className="flex items-center space-x-2"> 
          
          {/* Dark Mode Toggle Button (FIXED STYLING) */}
          <button
            onClick={toggleTheme}
            // Key to alignment: consistent height/width and centering
            className="text-foreground z-50 flex items-center justify-center h-8 w-8 transition-colors duration-300 hover:text-primary"
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}{" "}
          </button>

          {/* mobile menu toggle button (FIXED STYLING) */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            // Key to alignment: consistent height/width and centering
            className="md:hidden text-foreground z-50 flex items-center justify-center h-8 w-8" 
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
          </button>
        </div>


        {/* mobile menu overlay */}
        <div
          className={cn(
            "fixed inset-0 h-screen bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
