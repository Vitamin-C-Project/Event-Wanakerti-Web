import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/app/auth/login/form";
import FlyerJpeg from "@/assets/img/flyer.jpeg";
import Hook from "./hook";

export default function LoginPage() {
  const { state, handler } = Hook();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm
              form={state.form}
              onSubmit={state.form.handleSubmit(handler.handleSubmit)}
              state={state}
            />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={FlyerJpeg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
