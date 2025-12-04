import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  const handleAddToCart = () => {
    // Aqui seria a lógica para adicionar ao carrinho
    console.log(`Adicionado ao carrinho: ${product.name}`);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="overflow-hidden border-border hover:border-japinha-red/20 transition-smooth shadow-card hover:shadow-red">
        {/* Product Image */}
        <div className="relative overflow-hidden aspect-square">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Overlay with buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-primary/60 flex items-center justify-center gap-2"
          >
            <Button
              size="icon"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="bg-card/90 hover:bg-card shadow-lg"
            >
              <Heart 
                className={`h-4 w-4 ${isLiked ? 'fill-japinha-red text-japinha-red' : 'text-foreground'}`} 
              />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="bg-japinha-red hover:bg-japinha-red-dark text-japinha-red-foreground shadow-lg"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </motion.div>

          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-card/90 text-foreground px-2 py-1 rounded-full text-xs font-medium">
              {product.category}
            </span>
          </div>

          {/* Price Badge */}
          <div className="absolute top-2 right-2">
            <span className="bg-japinha-red text-japinha-red-foreground px-2 py-1 rounded-full text-xs font-bold">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <CardContent className="p-4">
          <motion.h3
            className="font-semibold text-foreground mb-2 line-clamp-1"
            animate={{ 
              color: isHovered ? "hsl(var(--japinha-red))" : "hsl(var(--foreground))" 
            }}
            transition={{ duration: 0.3 }}
          >
            {product.name}
          </motion.h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="text-lg font-bold text-japinha-red">
              R$ {product.price.toFixed(2)}
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddToCart}
                className="border-japinha-red text-japinha-red hover:bg-japinha-red hover:text-japinha-red-foreground"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Carrinho
              </Button>
            </motion.div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;