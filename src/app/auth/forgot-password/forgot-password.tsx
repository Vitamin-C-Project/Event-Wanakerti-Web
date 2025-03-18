import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import Hook from "./hook";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const { state, handler } = Hook();

  return (
    <Form {...state.form}>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-primary">
        <div className="w-full max-w-xs">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Atur ulang kata sandi Anda</CardTitle>
                <CardDescription>
                  Masukkan email Anda yang terdaftar dan kami akan mengirimkan
                  tautan untuk mengatur ulang kata sandi Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={state.form.handleSubmit(handler.handleSubmit)}>
                  <div className="flex flex-col gap-6">
                    <FormField
                      control={state.form.control}
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
                    <div className="flex flex-col gap-3">
                      {state.isLoadingForm ? (
                        <Button disabled>
                          <Loader2 />
                          Silahkan Tunggu...
                        </Button>
                      ) : (
                        <Button type="submit" className="w-full">
                          Kirim Tautan
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Kembali ke{" "}
                    <Link
                      to={"/auth/login"}
                      className="underline underline-offset-4"
                    >
                      Login
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Form>
  );
}
