import { cn } from "@/lib/utils";
import { Button, ButtonLink, ButtonLoader } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { FormInterface } from "@/interfaces/common";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function RegisterForm({
  className,
  form,
  state,
  ...props
}: FormInterface) {
  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-primary">
            Registrasi untuk bikin akun baru
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Masukan data anda sebelum bikin akun baru
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John doe"
                      {...field}
                      disabled={state.isLoadingForm}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                      disabled={state.isLoadingForm}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Kata Sandi</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      {...field}
                      disabled={state.isLoadingForm}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {state.isLoadingForm ? (
            <ButtonLoader />
          ) : (
            <Button type="submit" className="w-full">
              Registrasi
            </Button>
          )}
        </div>
        <div className="text-center text-sm text-primary">
          Sudah punya akun?{" "}
          <Link to={"/auth/login"} className="underline underline-offset-4">
            Masuk
          </Link>
        </div>
      </form>
    </Form>
  );
}
