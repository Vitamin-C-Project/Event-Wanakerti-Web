import { LoginForm } from "@/app/auth/login/form";
import FlyerJpeg from "@/assets/img/flyer.jpeg";
import Hook from "./hook";
import LogoPng from "@/assets/img/logo-wanakerti.png";
import { Text } from "@radix-ui/themes";

export default function LoginPage() {
  const { state, handler } = Hook();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-secondary">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="#"
            className="flex items-center flex-col md:flex-row gap-2 font-bold text-primary"
          >
            <img src={LogoPng} className="size-12" alt="Logo" />
            <Text>Pramuka Wanakerti</Text>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm
              form={state.form}
              onSubmit={state.form.handleSubmit(handler.handleSubmit)}
              state={state}
              handler={undefined}
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
