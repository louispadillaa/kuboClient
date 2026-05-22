import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "¿Cómo compara Kubo los precios en tiempo real?",
    answer: "Cuando ingresas una búsqueda, nuestro Gateway distribuye la tarea de inmediato. Se disparan scrapers automatizados construidos sobre Playwright y FastAPI que extraen la información directamente del HTML de tiendas como Alkosto, Éxito y Olímpica, entregándote el dato consolidado en segundos."
  },
  {
    question: "¿Qué papel juega la Inteligencia Artificial aquí?",
    answer: "Usamos modelos de machine learning para dos tareas críticas: la normalización taxonómica de productos (para asegurar que un producto con nombres diferentes en distintas tiendas sea identificado como el mismo) y el análisis analítico predictivo basado en snapshots históricos para calcular si el precio bajará o si es una oferta inflada."
  },
  {
    question: "¿Es seguro utilizar la plataforma?",
    answer: "Totalmente. Nuestra arquitectura cuenta con una capa de seguridad blindada mediante Keycloak. Kubo no procesa pagos directamente ni almacena datos bancarios; únicamente centraliza la analítica e información y te redirige mediante enlaces limpios a las tiendas oficiales para que compres con total tranquilidad."
  },
  {
    question: "¿Las alertas de precios se actualizarán solas?",
    answer: "Sí. Gracias a nuestro WebSocketModule, una vez marcas un producto con una alerta de monitoreo, el backend empuja la actualización de forma instantánea a tu pantalla en cuanto los scrapers detectan una fluctuación de costo, sin necesidad de que refresques el navegador manualmente."
  }
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-background relative z-10 border-t border-border/40">
      <div className="container px-4 md:px-8 mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Conoce la ingeniería detrás de nuestro motor de búsqueda y analítica.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = activeIndex === i;
            return (
              <div key={i} className="border-b border-border/60 pb-4">
                <button
                  onClick={() => setActiveIndex(isOpen ? null : i)}
                  className="w-full flex justify-between items-center text-left py-4 font-semibold text-base md:text-lg text-foreground hover:text-primary transition-colors focus:outline-none group"
                >
                  <span className="group-hover:text-primary transition-colors">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed pt-2 pb-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}