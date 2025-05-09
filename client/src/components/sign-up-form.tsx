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
import { useNavigate } from "react-router-dom";

interface loginForm {
  email: string;
  password: string;
  name: string;
}

export function SignUpForm({
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
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/home");
      // console.log(data);
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Realize o seu cadastro</CardTitle>
          <CardDescription>Prrencha os campos abaixo</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    type="name"
                    placeholder=""
                    required
                    {...register("name")}
                  />
                </div>
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
                  Cadastrar-se
                </Button>
              </div>
              <div className="text-center text-sm">
                Já tem uma conta?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Entrar
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
