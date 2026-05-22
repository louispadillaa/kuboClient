import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden flex items-center justify-center min-h-[90vh] bg-grid-pattern">
      {/* Luces de fondo difuminadas (Gradientes estéticos de Kubo) */}
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]" />
      <div className="absolute right-10 bottom-10 -z-10 h-[250px] w-[250px] rounded-full bg-purple-600 opacity-10 blur-[80px]" />
      
      <div className="container px-4 md:px-8 mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative z-10">
        
        {/* TEXTO PRINCIPAL (IZQUIRDA) */}
        <motion.div 
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs md:text-sm font-medium text-primary mb-6 backdrop-blur-sm">
            Monitoreo inteligente en tiendas de Colombia en tiempo real
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
            No busques más.<br />
            <span className="bg-gradient-to-r from-primary via-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Kubo encuentra
            </span><br />
            el precio más bajo.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Nuestra IA y scrapers automatizados rastrean e-commerce en segundos. Encuentra el mejor precio real, analiza el historial y optimiza tus decisiones de compra.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="/search"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:bg-primary/90 hover:shadow-[0_4px_25px_rgba(139,92,246,0.6)] transition-all active:scale-98"
            >
              Probar el Buscador
            </a>
            <a
              href="#como-funciona"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full border border-border bg-card/50 text-foreground font-medium text-base hover:bg-accent/50 transition-colors"
            >
              Ver cómo funciona
            </a>
          </div>
        </motion.div>
        
        {/* PANEL INTERACTIVO DE SIMULACIÓN (DERECHA) */}
        <motion.div 
          className="flex-1 w-full max-w-[500px] relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative rounded-3xl border border-border/80 bg-card/40 p-6 md:p-8 shadow-2xl backdrop-blur-md overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-50" />
            
            <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
        
            </div>

            <div className="space-y-4 relative z-10">
              <div className="p-4 rounded-2xl bg-background/60 border border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                    AK
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Alkosto</div>
                    <div className="text-xs text-muted-foreground">Actualizado hace 5m</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm text-primary">$3.149.900</div>
                  <div className="text-[11px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">¡La mejor oferta!</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-background/40 border border-border/50 flex items-center justify-between opacity-80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-xs">
                    EX
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Éxito</div>
                    <div className="text-xs text-muted-foreground">Actualizado hace 1h</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">$3.299.000</div>
                  <div className="text-[11px] text-muted-foreground">+$149.100</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-background/40 border border-border/50 flex items-center justify-between opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                    OL
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Olímpica</div>
                    <div className="text-xs text-muted-foreground">Actualizado hace 2h</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">$3.410.000</div>
                  <div className="text-[11px] text-muted-foreground">+$260.100</div>
                </div>
              </div>
            </div>
          </div>

          {/* Badges Flotantes con Animación sutil de levitación */}
          <motion.div 
            animate={{ y: [0, -8, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-6 -left-6 bg-card/90 shadow-xl rounded-2xl p-3 border border-border flex items-center gap-2 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-foreground">Scrapers activos</span>
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}