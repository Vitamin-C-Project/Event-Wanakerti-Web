import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Heading } from "@radix-ui/themes";
import Hook from "./hook";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function VideoPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Konten Manajemen", href: "/dashboard/cms/video" },
        { title: "Video Lomba", href: "/dashboard/cms/video" },
      ]}
    >
      <Flex align={"center"} justify={"between"}>
        <Heading>Video Lomba</Heading>
        <Button
          variant="default"
          onClick={() =>
            handler.setVisible({
              show: true,
              title: "Ubah Video",
              type: 1,
            })
          }
        >
          Ubah Video
        </Button>
      </Flex>

      <Card className="w-full">
        <CardContent>
          {state.isLoadingData ? (
            <Skeleton className="h-[500px] w-full" />
          ) : (
            <iframe
              width="100%"
              height="500"
              src={state.video?.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={state.visible.show}
        onOpenChange={() =>
          handler.setVisible({ show: false, title: "", type: 1 })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{state.visible.title}</DialogTitle>
          </DialogHeader>
          <Form {...state.form}>
            <form
              onSubmit={state.form.handleSubmit(handler.handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={state.form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="url">
                      URL Video <br />
                      <small className="text-red-600">
                        (Contoh: https://www.youtube.com/embed/tgbNymZ7vqY,
                        <strong>hanya youtube</strong>)
                      </small>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="url"
                        type="url"
                        disabled={state.isLoadingForm}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                {state.isLoadingForm ? (
                  <Button disabled>
                    <Loader2 className="animate-spin" />
                    Silahkan tunggu
                  </Button>
                ) : (
                  <>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Tutup
                      </Button>
                    </DialogClose>
                    <Button variant="default" type="submit">
                      Simpan
                    </Button>
                  </>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
