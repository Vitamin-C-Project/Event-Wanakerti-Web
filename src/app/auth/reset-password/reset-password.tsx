import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Hook from "./hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ResetPasswordPage() {
  const { state, handler } = Hook();
  return (
    <Form {...state.form}>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-primary">
        <div className="w-full max-w-xs">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Atur ulang kata sandi Anda</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={state.form.handleSubmit(handler.handleSubmit)}>
                  <div className="flex flex-col gap-6">
                    <FormField
                      control={state.form.control}
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
                    <FormField
                      control={state.form.control}
                      name="password_confirmation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="password_confirmation">
                            Konfirmasi Kata Sandi
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="password_confirmation"
                              type="password"
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
                          Simpan
                        </Button>
                      )}
                    </div>
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
