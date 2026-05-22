import { motion } from "framer-motion";
import { AlertCircle, Clock, TrendingDown, CheckCircle2, Zap, BarChart3 } from "lucide-react";

export function ProblemSolution() {
  return (
    <section className="py-24 bg-muted/10 border-t border-border/30">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* TARJETA DEL PROBLEMA (IZQUIERDA) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl bg-card/50 border border-destructive/20 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <AlertCircle className="w-32 h-32 text-destructive" />
            </div>
            <div className="inline-flex items-center rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive mb-6">
              El Problema en Colombia
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Comprar tecnología y hogar online es un caos</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">Pérdida de tiempo masiva</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Navegar manualmente por pestañas infinitas de Alkosto, Falabella y Éxito intentando comparar un mismo artículo.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">Falsos descuentos</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Tiendas que inflan los precios la semana anterior a un evento especial para simular ofertas que no existen.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* TARJETA DE LA SOLUCIÓN (DERECHA) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/20 via-background to-background border border-primary/30 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Zap className="w-32 h-32 text-primary" />
            </div>
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/20 px-3 py-1 text-sm font-medium text-primary mb-6">
              La Solución con Kubo
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Automatización inteligente y centralizada</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">Scraping asíncrono y reactivo</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Nuestros microservicios ejecutan Playwright en segundo plano extrayendo los precios reales directo del HTML.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">Predicción analítica</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">Modelos estadísticos analizan los snapshots históricos para decirte con certeza matemática si el precio bajará.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}