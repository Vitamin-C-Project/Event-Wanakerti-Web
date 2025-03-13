import { cn } from "@/lib/utils";
import { Button, ButtonLink, ButtonLoader } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormInterface } from "@/interfaces/common";
import { Flex } from "@radix-ui/themes";

export function LoginForm({ className, form, state, ...props }: FormInterface) {
  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login untuk masuk Dasbor</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Masukan email anda sebelum masuk ke Dasbor
          </p>
        </div>
        <div className="grid gap-6">
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
                  <Flex align={"center"}>
                    <FormLabel htmlFor="password">Kata Sandi</FormLabel>
                    <Link
                      to="/auth/forgot-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Lupa kata sandi Anda?
                    </Link>
                  </Flex>
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
              Masuk
            </Button>
          )}
        </div>
        <div className="text-center text-sm">
          Belum punya akun?{" "}
          <Link to={"/auth/register"} className="underline underline-offset-4">
            Registrasi
          </Link>
        </div>
      </form>
    </Form>
  );
}
