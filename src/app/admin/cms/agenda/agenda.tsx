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

export default function AgendaPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}>
      <Flex align={"center"} justify={"between"}>
        <Heading>Agenda Kegiatan</Heading>
      </Flex>
      {JSON.stringify(state.agenda)}

      <Form {...state.form}>
        <form onSubmit={state.form.handleSubmit(handler.handleSubmit)}>
          <Card className="w-full">
            <CardContent>
              <Grid columns="12" className="gap-4">
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
              </Grid>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="default">Simpan</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </DashboardLayout>
  );
}
