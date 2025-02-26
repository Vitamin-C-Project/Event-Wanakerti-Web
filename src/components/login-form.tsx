import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login untuk masuk Dasbor</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Masukan email anda sebelum masuk ke Dasbor
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Kata Sandi</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Lupa kata sandi Anda?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <ButtonLink to="/dashboard" className="w-full">
          Masuk
        </ButtonLink>
      </div>
      <div className="text-center text-sm">
        Belum punya akun?{" "}
        <Link to={"/auth/register"} className="underline underline-offset-4">
          Registrasi
        </Link>
      </div>
    </form>
  );
}
