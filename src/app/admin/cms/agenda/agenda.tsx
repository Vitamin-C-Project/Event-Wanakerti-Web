import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/layout/dashboard-layout";
import { Label } from "@radix-ui/react-label";
import { Flex, Grid, Heading } from "@radix-ui/themes";
import Hook from "./hook";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function AgendaPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Konten Manajemen", href: "/dashboard/cms/agenda" },
        { title: "Agenda Kegiatan", href: "/dashboard/cms/agenda" },
      ]}
    >
      <Flex align={"center"} justify={"between"}>
        <Heading>Agenda Kegiatan</Heading>
      </Flex>

      <Form {...state.form}>
        <form onSubmit={state.form.handleSubmit(handler.handleSubmit)}>
          <Card className="w-full">
            <CardContent>
              <Grid columns="12" className="gap-4">
                {state.isLoadingData ? (
                  <>
                    <Skeleton className="h-10 col-span-4" />
                    <Skeleton className="h-10 col-span-8" />
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
                    <Label className="col-span-4 w-full">Jadwal Kegiatan</Label>
                    <FormField
                      control={state.form.control}
                      name="activity_day"
                      render={({ field }) => (
                        <FormItem className="w-full col-span-8">
                          <FormControl>
                            <Input
                              type="date"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              disabled={state.isLoadingForm}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Label className="col-span-4 w-full">
                      Jadwal Technical Meeting 1
                    </Label>
                    <FormField
                      control={state.form.control}
                      name="technical_meeting_1"
                      render={({ field }) => (
                        <FormItem className="w-full col-span-8">
                          <FormControl>
                            <Input
                              type="date"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              disabled={state.isLoadingForm}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Label className="col-span-4 w-full">
                      Jadwal Technical Meeting 2
                    </Label>
                    <FormField
                      control={state.form.control}
                      name="technical_meeting_2"
                      render={({ field }) => (
                        <FormItem className="w-full col-span-8">
                          <FormControl>
                            <Input
                              type="date"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              disabled={state.isLoadingForm}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Label className="col-span-4 w-full">
                      Jadwal Pembuka Pendaftaran
                    </Label>
                    <FormField
                      control={state.form.control}
                      name="start_registration"
                      render={({ field }) => (
                        <FormItem className="w-full col-span-8">
                          <FormControl>
                            <Input
                              type="date"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              disabled={state.isLoadingForm}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Label className="col-span-4 w-full">
                      Jadwal Penutupan Pendaftaran
                    </Label>
                    <FormField
                      control={state.form.control}
                      name="end_registration"
                      render={({ field }) => (
                        <FormItem className="w-full col-span-8">
                          <FormControl>
                            <Input
                              type="date"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              disabled={state.isLoadingForm}
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
              {state.isLoadingForm ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
    </DashboardLayout>
  );
}
