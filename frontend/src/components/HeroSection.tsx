import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const navigator = useNavigate()


  function navigateTo(page:string){
    navigator(`/${page}`);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 text-japinha-red"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="h-6 w-6 opacity-60" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 right-20 text-japinha-red"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Sparkles className="h-4 w-4 opacity-40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-border"
        >
          <Sparkles className="h-4 w-4 text-japinha-red" />
          <span className="text-sm text-muted-foreground">
            Moda Infantil Japonesa Autêntica
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
        >
          <span className="block">Descubra a</span>
          <span className="text-japinha-red block font-japanese">
            Elegância Japonesa
          </span>
          <span className="block">para Crianças</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Roupas únicas inspiradas na cultura japonesa, com design minimalista
          e qualidade excepcional para os pequenos.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={()=>navigateTo("catalog")}
            size="lg"
            className="group bg-japinha-red hover:bg-japinha-red-dark text-japinha-red-foreground px-8 py-6 text-lg transition-spring shadow-red"
          >
            <motion.span
              whileHover={{ x: 5 }}
              className="flex items-center gap-2"
            >
              Visite nosso Catálogo
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-smooth" />
            </motion.span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg transition-spring"
          >
            Sobre a Marca
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-border/50"
        >
          {[
            { number: "500+", label: "Produtos Únicos" },
            { number: "1000+", label: "Clientes Felizes" },
            { number: "100%", label: "Qualidade Garantida" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-japinha-red">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border border-foreground/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-japinha-red rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;