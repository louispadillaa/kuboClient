import { useState, useEffect } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? "border-b border-border/60 bg-background/80 backdrop-blur-md" 
        : "border-b border-transparent bg-transparent"
    }`}>
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-8">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center space-x-2">
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Kubo
            </span>
          </a>
        </div>
        
        {/* MENÚ DE NAVEGACIÓN DE LA LANDING */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#como-funciona" className="hover:text-foreground transition-colors">Cómo funciona</a>
          <a href="#tiendas" className="hover:text-foreground transition-colors">Tiendas</a>
          <a href="#inteligencia" className="hover:text-foreground transition-colors">Predicción IA</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>
        
        {/* BOTÓN ESTILO AIRBNB */}
        <div className="flex items-center gap-4">
          <a 
            href="/search" 
            className="group relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-semibold rounded-full group bg-gradient-to-br from-primary to-purple-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-800 transition-transform active:scale-95 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] mt-2"
          >
            <span className="relative px-6 py-2.5 transition-all ease-in duration-75 bg-background rounded-full group-hover:bg-opacity-0 text-foreground font-medium ">
              Empieza la búsqueda
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}