import MaskotPng from "@/assets/img/maskot.png";
import LogoPng from "@/assets/img/logo-wanakerti.png";
import Hook from "./hook";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function ContactUs({ contents }: { contents: any }) {
  const { handler, state } = Hook();

  return (
    <div id="contact" className="py-16 bg-green-400 relative overflow-hidden">
      <div className="absolute top-10 right-10 text-yellow-200 text-4xl">
        ✨
      </div>
      <div className="absolute bottom-10 left-10 text-yellow-200 text-4xl">
        ✨
      </div>

      <div className="container mx-auto px-4 min-h-[700px] sm:min-h-1.5 pt-10">
        <h2 className="text-center text-3xl font-display font-bold mb-12 uppercase">
          Kontak Kami
        </h2>

        <Form {...state.form}>
          <form
            className="space-y-4 max-w-2xl mx-auto"
            onSubmit={state.form.handleSubmit(handler.handleSubmit)}
          >
            <div className="form-control">
              <FormField
                control={state.form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Nama Lengkap"
                        className="bg-white p-2 rounded-2xl input-bordered w-full text-sm input"
                        {...field}
                        disabled={state.isLoadingForm}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="form-control">
              <FormField
                control={state.form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type="email"
                        placeholder="Email"
                        className="bg-white p-2 rounded-2xl input-bordered w-full text-sm input"
                        {...field}
                        disabled={state.isLoadingForm}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="form-control">
              <FormField
                control={state.form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea
                        placeholder="Pesan"
                        className="textarea h-32 w-full bg-white p-2 rounded-2xl"
                        {...field}
                        disabled={state.isLoadingForm}
                      ></textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-warning rounded-full px-8"
                disabled={state.isLoadingForm}
              >
                Kirim Pesan
              </button>
            </div>
          </form>
        </Form>
      </div>

      <div className="absolute bottom-2 right-20 max-w-xs">
        <div className="flex">
          <img
            src={contents.theme ? contents.theme.mascot : MaskotPng}
            onError={(e: any) => (e.target.src = MaskotPng)}
            alt=""
            style={{ height: 150 }}
          />
          <img
            src={contents.theme ? contents.theme.logo : LogoPng}
            onError={(e: any) => (e.target.src = LogoPng)}
            alt=""
            style={{ height: 150 }}
          />
        </div>
      </div>
    </div>
  );
}
