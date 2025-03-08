import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Grid, Heading } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MaskotPng from "@/assets/img/maskot.png";
import LogoPng from "@/assets/img/logo-wanakerti.png";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Hook from "./hook";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

export default function MascotLogoPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Konten Manajemen", href: "/dashboard/cms/mascot-logo" },
        { title: "Maskot & Logo", href: "/dashboard/cms/mascot-logo" },
      ]}
    >
      <Flex align={"center"} justify={"between"}>
        <Heading>Maskot & Logo</Heading>
      </Flex>

      <Grid columns="12" className="gap-4">
        <Card className="w-full col-span-12 sm:col-span-6">
          <CardHeader>
            <Flex align={"center"} justify={"between"}>
              <CardTitle>Maskot</CardTitle>
              <Button
                variant="default"
                onClick={() =>
                  handler.setVisible({
                    show: true,
                    title: "Ubah Maskot",
                    type: 1,
                  })
                }
              >
                Ubah Maskot
              </Button>
            </Flex>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            {state.isLoadingMascot ? (
              <Skeleton className="h-[200px] w-full" />
            ) : (
              <img
                src={
                  state.mascot?.mascot_image
                    ? state.mascot.mascot_image
                    : MaskotPng
                }
                onError={(e) => (e.currentTarget.src = MaskotPng)}
                alt=""
                style={{ height: 200 }}
              />
            )}
          </CardContent>
        </Card>
        <Card className="w-full col-span-12 sm:col-span-6">
          <CardHeader>
            <Flex align={"center"} justify={"between"}>
              <CardTitle>Logo</CardTitle>
              <Button
                variant="default"
                onClick={() =>
                  handler.setVisible({
                    show: true,
                    title: "Ubah Logo",
                    type: 2,
                  })
                }
              >
                Ubah Logo
              </Button>
            </Flex>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            {state.isLoadingLogo ? (
              <Skeleton className="h-[200px] w-full" />
            ) : (
              <img
                src={state.logo?.logo_image ? state.logo.logo_image : LogoPng}
                alt=""
                style={{ height: 200 }}
                onError={(e) => (e.currentTarget.src = LogoPng)}
              />
            )}
          </CardContent>
        </Card>
      </Grid>

      <Form {...state.formActivity}>
        <form
          onSubmit={state.formActivity.handleSubmit(
            handler.handleUpdateActivity
          )}
        >
          <Card className="w-full">
            <CardHeader>
              <Flex align={"center"} justify={"between"}>
                <CardTitle>Tema Kegiatan</CardTitle>
              </Flex>
            </CardHeader>
            <CardContent>
              <Grid columns="12" className="gap-4">
                {state.isLoadingActivity ? (
                  <>
                    <Skeleton className="h-10 col-span-4" />
                    <Skeleton className="h-10 col-span-8" />
                    <Skeleton className="h-10 col-span-4" />
                    <Skeleton className="h-10 col-span-8" />
                    <Skeleton className="h-10 col-span-4" />
                    <Skeleton className="h-10 col-span-8" />
                    <Skeleton className="h-10 col-span-4" />
                    <Skeleton className="h-10 col-span-8" />
                  </>
                ) : (
                  <>
                    <Label className="col-span-4 w-full">Judul Lengkap</Label>
                    <FormField
                      control={state.formActivity.control}
                      name="full_title"
                      render={({ field }) => (
                        <FormItem className="w-full col-span-8">
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              disabled={state.isLoadingActivity}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Label className="col-span-4 w-full">Judul Singkatan</Label>
                    <FormField
                      control={state.formActivity.control}
                      name="short_title"
                      render={({ field }) => (
                        <FormItem className="w-full col-span-8">
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              disabled={state.isLoadingActivity}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Label className="col-span-4 w-full">Nama Pangkalan</Label>
                    <FormField
                      control={state.formActivity.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem className="w-full col-span-8">
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              disabled={state.isLoadingActivity}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Label className="col-span-4 w-full">
                      Nama Gugus Depan
                    </Label>
                    <FormField
                      control={state.formActivity.control}
                      name="group_name"
                      render={({ field }) => (
                        <FormItem className="w-full col-span-8">
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              disabled={state.isLoadingActivity}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </Grid>
            </CardContent>
            <CardFooter className="justify-end">
              {state.isLoadingActivity ? (
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  Silahkan tunggu
                </Button>
              ) : (
                <Button variant="default" type="submit">
                  Simpan
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>

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
          <Form {...state.formImage}>
            <form
              onSubmit={
                state.visible.type == 1
                  ? state.formImage.handleSubmit(handler.handleUpdateMascot)
                  : state.formImage.handleSubmit(handler.handleUpdateLogo)
              }
              className="space-y-4"
            >
              <FormField
                control={state.formImage.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="image">Unggah Gambar</FormLabel>
                    <FormControl>
                      <Input
                        id="image"
                        type="file"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        disabled={
                          state.visible.type == 1
                            ? state.isLoadingMascot
                            : state.isLoadingLogo
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                {state.isLoadingLogo || state.isLoadingMascot ? (
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
                    <Button variant="default">Simpan</Button>
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
