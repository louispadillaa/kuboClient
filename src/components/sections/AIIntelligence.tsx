// src/components/sections/AIIntelligence.tsx
import { motion } from "framer-motion";
import { Brain, Sparkles, TrendingDown } from "lucide-react";

export function AIIntelligence() {
  return (
    <section id="inteligencia" className="py-24 bg-background border-b border-border/40 relative overflow-hidden">
      <div className="absolute right-0 top-1/4 -z-10 h-[350px] w-[350px] rounded-full bg-purple-500/5 blur-[120px]" />
      
      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* TEXTO INFORMATIVO (IZQUIERDA) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-400">
              <Brain className="w-4 h-4" /> MLGatewayModule
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Modelos predictivos que cuidan tu dinero
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              No solo recopilamos datos. Nuestro módulo de Machine Learning en FastAPI analiza los patrones estacionales en el mercado de Colombia. El sistema detecta anomalías e infiere curvas futuras de costos.
            </p>
            
            <div className="p-4 rounded-2xl bg-card/40 border border-border flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground font-semibold">Consejo de Kubo:</strong> El sistema proyecta una ventana de descuento óptima para componentes electrónicos durante las próximas dos semanas. ¡Espera antes de comprar!
              </div>
            </div>
          </div>

          {/* SIMULADOR DE GRÁFICA VECTORIAL PREMIUM (DERECHA) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-card/30 border border-border/80 backdrop-blur-sm shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg text-foreground">Tendencia Histórica & Predictiva</h3>
                <p className="text-xs text-muted-foreground">Análisis basado en regresiones lineales de snapshots</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                <TrendingDown className="w-3.5 h-3.5" /> Caída esperada -12%
              </span>
            </div>

            {/* GRÁFICO SVG ANIMADO */}
            <div className="w-full h-64 bg-background/50 rounded-2xl border border-border/50 relative p-4 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 flex flex-col justify-between py-6 px-2 opacity-10 pointer-events-none">
                {[1, 2, 3, 4].map((i) => <div key={i} className="w-full border-b border-foreground" />)}
              </div>
              
              {/* Línea del gráfico */}
              <div className="w-full h-48 mt-auto relative">
                <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25"/>
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.0"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Área debajo de la curva */}
                  <path 
                    d="M 0 50 Q 100 20 200 80 T 400 120 T 600 170 L 600 200 L 0 200 Z" 
                    fill="url(#gradient)" 
                  />
                  
                  {/* Curva principal */}
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M 0 50 Q 100 20 200 80 T 400 120 T 600 170" 
                    fill="none" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                  />
                  
                  {/* Nodo flotante interactivo simulado */}
                  <circle cx="400" cy="120" r="6" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="3" />
                  <circle cx="600" cy="170" r="6" fill="hsl(var(--background))" stroke="#10b981" strokeWidth="3" />
                </svg>
                
                {/* Indicadores en los nodos */}
                <div className="absolute top-[30%] left-[62%] bg-card border border-border text-[10px] font-mono px-1.5 py-0.5 rounded shadow-md">
                  $1.250.000
                </div>
                <div className="absolute top-[65%] left-[88%] bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-md animate-pulse">
                  $1.090.000
                </div>
              </div>

              {/* Etiquetas del eje X */}
              <div className="flex justify-between text-xs font-medium text-muted-foreground pt-2 border-t border-border/40">
                <span>Ene</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Abr</span>
                <span>May (Hoy)</span>
                <span className="text-emerald-400 font-semibold">Proyección</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}