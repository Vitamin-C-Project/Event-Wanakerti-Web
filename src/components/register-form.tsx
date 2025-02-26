import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Registrasi untuk bikin akun baru</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Masukan data anda sebelum bikin akun baru
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="text">Nama Lengkap</Label>
          <Input id="text" type="text" placeholder="John doe" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Kata Sandi</Label>
          </div>
          <Input id="password" type="password" required />
        </div>
        <ButtonLink to="/auth/login" className="w-full">
          Registrasi
        </ButtonLink>
      </div>
      <div className="text-center text-sm">
        Sudah punya akun?{" "}
        <Link to={"/auth/login"} className="underline underline-offset-4">
          Masuk
        </Link>
      </div>
    </form>
  );
}
