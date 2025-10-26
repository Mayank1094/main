import { cn } from "@/lib/utils";
import { Menu, X, Moon } from "lucide-react"; // Added Moon for the placeholder icon
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
  // Assuming you have a dark mode state, using a simple placeholder here
  const [isDarkMode, setIsDarkMode] = useState(true); 

  useEffect(() => {
    const handleScroll = () => {
      // FIX 1: Use window.scrollY for proper scroll detection on all devices
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        // Scroll effect for the main navbar
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo/Portfolio Link */}
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground"> </span>{" "}
            Portfolio
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

        {/* FIX 2: Grouping the mobile buttons to maintain vertical alignment */}
        <div className="flex items-center md:hidden"> 
            
            {/* Theme Toggle Button Placeholder (Your actual toggle code should replace this) */}
            <button
                onClick={() => setIsDarkMode(prev => !prev)}
                className="p-2 text-foreground z-50 mr-2 rounded-full hover:bg-foreground/10 transition-colors" 
                aria-label="Toggle Theme"
            >
                {/* Using a Moon icon as a visual placeholder for the toggle */}
                <Moon size={20} /> 
            </button>


            {/* mobile menu button (Hamburger/X) */}
            <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="p-2 text-foreground z-50"
                aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
            </button>
        </div>


        {/* mobile nav overlay */}
        <div
          className={cn(
            // FIX 3: Added h-screen for full viewport coverage
            // FIX 4: Restored original transparency (bg-background/95)
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
