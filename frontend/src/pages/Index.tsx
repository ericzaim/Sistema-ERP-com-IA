import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import {useContext, useEffect, useState} from "react";
import japinhaLogo from "@/assets/japinha-logo.png";
import {AuthContext} from "@/context/AuthContext.tsx";

// Schema de validação para o formulário
const loginSchema = z.object({
  name: z.string().min(1, "Insira o Login"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string>("");
  const navigator = useNavigate();
  const { user,login } = useContext(AuthContext);

    useEffect(() => {
        localStorage.removeItem("user");
    }, []);


    const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "Eric",
      password: "kenji123",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoginError("");
      const logged = await login(data);
      if(logged) {
          navigator("/dashboard");
      }
    } catch (error) {
      setLoginError("Erro ao fazer login. Tente novamente.");
      console.error("Erro no login:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none ">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-japinha-red/5 rounded-full "
          animate={{ y: [-10, 10, -10], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
            <img
                src={japinhaLogo}
                alt="Japinha Logo"
                className="w-full h-full object-contain"
            />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="shadow-2xl border-border/50 backdrop-blur-sm bg-card/95">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <img
                src={japinhaLogo}
                alt="Japinha Logo"
                className="w-16 h-16 object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CardTitle className="text-2xl font-bold text-foreground font-japanese">
                Sistema ERP Japinha
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Faça login para acessar o gerenciamento de estoque
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-foreground">
                          <User className="w-4 h-4" />
                          Login
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="nome"
                            className="transition-all duration-300 focus:ring-2 focus:ring-japinha-red/20 focus:border-japinha-red"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-foreground">
                          <Lock className="w-4 h-4" />
                          Senha
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="transition-all duration-300 focus:ring-2 focus:ring-japinha-red/20 focus:border-japinha-red pr-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <Eye className="w-4 h-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Espaço reservado para mensagens de erro */}
                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-destructive/10 border border-destructive/20 rounded-md"
                  >
                    <p className="text-destructive text-sm text-center">{loginError}</p>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="space-y-4"
                >
                  <Button
                    type="submit"
                    className="w-full bg-japinha-red hover:bg-japinha-red-dark text-japinha-red-foreground font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
                  </Button>

                  {/* Espaço reservado para recuperação de senha */}
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      className="text-muted-foreground hover:text-japinha-red text-sm transition-colors duration-300"
                      onClick={() => {
                          navigator("/dashboard");
                        // TODO: Implementar lógica de recuperação de senha
                        console.log("Recuperar senha - implementar futuramente");
                      }}
                    >
                      Esqueceu sua senha?
                    </Button>
                  </div>
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Texto informativo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-6"
        >
          <p className="text-muted-foreground text-sm">
            Sistema de gerenciamento integrado
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
