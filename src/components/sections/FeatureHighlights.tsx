// src/components/sections/FeatureHighlights.tsx
import { motion } from "framer-motion";
import { Zap, BrainCircuit, LineChart, ShieldCheck, RefreshCw, Layers } from "lucide-react";

const FEATURES = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Comparación en tiempo real",
    description: "Olvídate de datos obsoletos. Cuando consultas, el ecosistema reactivo refresca el estado en segundos."
  },
  {
    icon: <BrainCircuit className="w-6 h-6" />,
    title: "Recomendaciones con IA",
    description: "Nuestros microservicios de ML mapean alternativas idénticas con mejor disponibilidad o menor precio."
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Historial por Producto",
    description: "Guardamos snapshots diarios en PostgreSQL para graficar con precisión quirúrgica las fluctuaciones de costos."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Arquitectura Segura",
    description: "Autenticación centralizada con Keycloak a nivel de Gateway. Tus credenciales y alertas están blindadas."
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Streams vía WebSockets",
    description: "Las actualizaciones del scraper e histórico se empujan instantáneamente a tu pantalla sin recargar la web."
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Capa GraphQL Avanzada",
    description: "Filtros complejos y búsquedas ultra veloces pidiendo únicamente los campos de datos exactos que requieres."
  }
];

export function FeatureHighlights() {
  return (
    <section className="py-24 bg-card/20 border-y border-border/40">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Ecosistema robusto de alta fidelidad
          </h2>
          <p className="text-muted-foreground">
            Ingeniería de software avanzada aplicada a la optimización financiera de tus compras online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-background/50 border border-border/80 hover:border-primary/50 transition-all shadow-sm hover:shadow-md group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}