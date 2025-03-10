import { Card, CardContent, CardFooter } from "@/components/ui/card";
import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Grid, Heading } from "@radix-ui/themes";
import Hook from "./hook";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout
      breadcrumbs={[
        { title: "Dasbor", href: "/dashboard" },
        { title: "Profil Saya", href: "/dashboard/profile" },
      ]}
    >
      <Flex align={"center"} justify={"between"}>
        <Heading>Profil Saya</Heading>
      </Flex>

      <Grid className="auto-rows-min gap-4" columns={{ md: "2" }}>
        <Card className="w-full">
          <Form {...state.formProfile}>
            <form
              className="space-y-4"
              onSubmit={state.formProfile.handleSubmit(
                handler.handleUpdateProfile
              )}
            >
              <CardContent className="space-y-4">
                <FormField
                  control={state.formProfile.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full col-span-12">
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          disabled={state.isLoadingProfile}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={state.formProfile.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full col-span-12">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          disabled={state.isLoadingProfile}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="justify-end">
                {state.isLoadingProfile ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </Button>
                ) : (
                  <Button type="submit">Simpan</Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
        <Card className="w-full">
          <Form {...state.formPassword}>
            <form
              className="space-y-4"
              onSubmit={state.formPassword.handleSubmit(
                handler.handleUpdatePassword
              )}
            >
              <CardContent className="space-y-4">
                <FormField
                  control={state.formPassword.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full col-span-12">
                      <FormLabel>Kata Sandi Baru</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          disabled={state.isLoadingProfile}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={state.formPassword.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem className="w-full col-span-12">
                      <FormLabel>Konfirmasi Kata Sandi Baru</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          disabled={state.isLoadingProfile}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="justify-end">
                {state.isLoadingProfile ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </Button>
                ) : (
                  <Button type="submit">Ubah Password</Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
      </Grid>
    </DashboardLayout>
  );
}
