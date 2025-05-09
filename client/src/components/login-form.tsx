import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {useNavigate} from "react-router-dom"
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

interface loginForm {
  email: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, handleSubmit } = useForm<loginForm>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<loginForm> = (data) => {
    mutate(data);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: loginForm) => {
      const response = await axios.post("http://localhost:3000/auth/login", data);
      return response.data;
    },
    onError: (error : AxiosError<{message: string}>) => {
      toast.error(`${error?.response?.data?.message}`);
      console.log(error); 
    },
    onSuccess: (response) => {
      localStorage.setItem("token", response.token);
      toast.success("Login realizado com sucesso");
      navigate("/home");
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem vindo de volta</CardTitle>
          <CardDescription>Entre com sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...register("email")}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    {...register("password")}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full cursor-pointer"
                >
                  Entrar
                </Button>
              </div>
              <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Cadastre-se
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
