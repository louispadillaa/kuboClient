// src/components/sections/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-card border-t border-border/40 pt-16 pb-8 relative z-10">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <a href="/" className="flex items-center space-x-2">
              <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Kubo
              </span>
            </a>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              El comparador inteligente y analítico con IA para el mercado e-commerce de Colombia. Rastreamos, normalizamos y optimizamos tus decisiones de compra.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">Plataforma</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">Cómo funciona</a></li>
              <li><a href="#inteligencia" className="text-muted-foreground hover:text-foreground transition-colors">Predicción IA</a></li>
              <li><a href="/search" className="text-muted-foreground hover:text-primary font-medium transition-colors">Probar Buscador 🚀</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">Soporte</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentación API</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Estado del Sistema</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Términos</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacidad</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Kubo Core. Todos los derechos reservados.
          </p>
          <div className="text-sm font-medium text-muted-foreground">
            Desarrollado con precisión arquitectónica en Colombia 🇨🇴
          </div>
        </div>
      </div>
    </footer>
  );
}