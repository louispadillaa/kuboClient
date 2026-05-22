import { motion, AnimatePresence } from "framer-motion";
import { Search, Bot, Sparkles, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const RESULTS = [
  { store: "Alkosto", price: 3149900, isBest: true, logo: "AK", logoBg: "bg-blue-600 text-white" },
  { store: "Éxito", price: 3299000, isBest: false, logo: "EX", logoBg: "bg-yellow-400 text-black" },
  { store: "Olímpica", price: 3410000, isBest: false, logo: "OL", logoBg: "bg-red-600 text-white" },
  { store: "Falabella", price: 3349000, isBest: false, logo: "FA", logoBg: "bg-emerald-600 text-white" }
];

export function LiveDemo() {
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Simulación en bucle continuo para la Landing Page
    const timer = setInterval(() => {
      setIsSearching(true);
      setShowResults(false);
      setInputValue("PlayStation 5 Slim...");
      
      setTimeout(() => {
        setIsSearching(false);
        setShowResults(true);
      }, 2000);
      
    }, 9000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="como-funciona" className="py-24 overflow-hidden relative bg-background border-t border-border/40">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* TEXTO EXPLICATIVO (IZQUIERDA) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Bot className="w-4 h-4" /> Demo en vivo
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Mira cómo trabaja nuestro ecosistema
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cuando buscas un producto, el Gateway distribuye la carga de inmediato. Nuestro servicio reactivo despierta a los scrapers automatizados para extraer y normalizar los precios de las cadenas principales de Colombia en segundos.
            </p>
            
            <ul className="space-y-4 pt-2">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm md:text-base">Mapeo y normalización con Inteligencia Artificial</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm md:text-base">Detección de fluctuaciones falsas de precios</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="font-medium text-sm md:text-base">Conexión directa vía WebSockets al Frontend</span>
              </li>
            </ul>
          </div>

          {/* SIMULADOR INTERACTIVO (DERECHA) */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-card/30 border border-border/80 rounded-3xl p-6 md:p-8 backdrop-blur-sm relative shadow-xl">
              
              {/* Barra de búsqueda simulada */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  readOnly
                  value={inputValue}
                  placeholder="Escribe un producto (ej. iPhone 15)..."
                  className="w-full bg-background/80 border border-border rounded-full py-3 pl-12 pr-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground font-medium"
                />
                {isSearching && (
                  <div className="absolute right-4 top-3 flex items-center gap-2 bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
                    <Sparkles className="w-3 h-3 animate-spin" /> Scrapeando...
                  </div>
                )}
              </div>

              {/* Contenedor Animado de Resultados */}
              <div className="min-h-[280px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!isSearching && !showResults && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-muted-foreground py-12"
                    >
                      <Bot className="w-12 h-12 mx-auto mb-3 opacity-40 text-primary animate-bounce" />
                      <p className="text-sm font-medium">Esperando ciclo automático de consulta...</p>
                    </motion.div>
                  )}

                  {isSearching && (
                    <motion.div
                      key="searching"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3 py-4"
                    >
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 w-full bg-muted/40 border border-border/30 rounded-2xl animate-pulse flex items-center px-4 justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted" />
                            <div className="space-y-2">
                              <div className="h-4 w-24 bg-muted rounded" />
                              <div className="h-3 w-16 bg-muted rounded" />
                            </div>
                          </div>
                          <div className="h-4 w-20 bg-muted rounded" />
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {showResults && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div className="text-xs font-semibold text-muted-foreground mb-1 px-1">
                        Resultados consolidados en tiempo real:
                      </div>
                      {RESULTS.map((res, idx) => (
                        <motion.div
                          key={res.store}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                            res.isBest 
                              ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(139,92,246,0.15)]" 
                              : "bg-background/60 border-border/60 hover:border-border"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${res.logoBg} flex items-center justify-center font-bold text-xs shadow-sm`}>
                              {res.logo}
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-foreground">{res.store}</div>
                              <div className="text-[11px] text-muted-foreground">Disponibilidad inmediata</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold text-sm ${res.isBest ? "text-primary" : "text-foreground"}`}>
                              ${res.price.toLocaleString("es-CO")}
                            </div>
                            {res.isBest && (
                              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                Precio más bajo
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}