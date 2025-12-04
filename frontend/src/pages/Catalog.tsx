import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

const Catalog = () => {
  // Mock products data - em um app real viria de uma API
  const products = [
    {
      id: 1,
      name: "Kimono Infantil Sakura",
      price: 89.90,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      category: "Kimonos",
      description: "Kimono tradicional com estampa de flores de cerejeira"
    },
    {
      id: 2,
      name: "Vestido Origami",
      price: 65.90,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop",
      category: "Vestidos",
      description: "Vestido inspirado na arte do origami"
    },
    {
      id: 3,
      name: "Conjunto Ninja",
      price: 75.90,
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5a2?w=300&h=300&fit=crop",
      category: "Conjuntos",
      description: "Conjunto ninja para os pequenos guerreiros"
    },
    {
      id: 4,
      name: "Yukata Verão",
      price: 95.90,
      image: "https://images.unsplash.com/photo-1566479179817-c0cbdb17bb57?w=300&h=300&fit=crop",
      category: "Yukatas",
      description: "Yukata leve e fresco para o verão"
    },
    {
      id: 5,
      name: "Blusa Koi",
      price: 45.90,
      image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?w=300&h=300&fit=crop",
      category: "Blusas",
      description: "Blusa com estampa de carpas koi"
    },
    {
      id: 6,
      name: "Calça Bamboo",
      price: 55.90,
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=300&fit=crop",
      category: "Calças",
      description: "Calça confortável com estampa de bambu"
    },
    {
      id: 7,
      name: "Macacão Daruma",
      price: 85.90,
      image: "https://images.unsplash.com/photo-1519582149095-fe7d19b2a3d2?w=300&h=300&fit=crop",
      category: "Macacões",
      description: "Macacão com boneca Daruma bordada"
    },
    {
      id: 8,
      name: "Saia Plissada Zen",
      price: 49.90,
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=300&fit=crop",
      category: "Saias",
      description: "Saia plissada em estilo zen minimalista"
    }
  ];

  const categories = ["Todos", ...Array.from(new Set(products.map(p => p.category)))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-24 pb-12 bg-gradient-to-b from-muted/50 to-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-japanese"
          >
            Catálogo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Descubra nossa coleção única de roupas infantis inspiradas na cultura japonesa
          </motion.p>
        </div>
      </motion.section>

      {/* Filters Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="py-8 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full border border-border hover:border-japinha-red hover:text-japinha-red transition-smooth text-sm font-medium"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Products Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Catalog;