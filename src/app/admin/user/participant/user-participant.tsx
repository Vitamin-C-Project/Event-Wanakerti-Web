import DashboardLayout from "@/layout/dashboard-layout";
import { columns } from "./columns";
import Hook from "./hook";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { DataTable } from "@/components/data-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/pagination-datatable";

export default function UserAdminPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout
      breadcrumbs={[
        { title: "Dasbor", href: "/dashboard" },
        { title: "Pengaturan", href: "/dashboard/users/participant" },
        { title: "Data Akun", href: "/dashboard/users/participant" },
        { title: "Peserta", href: "/dashboard/users/participant" },
      ]}
    >
      <Flex align={"center"} justify={"between"} gap={"4"} className="mb-4">
        <Heading>Data Akun Peserta</Heading>

        <Button
          onClick={() =>
            handler.setVisible({
              show: true,
              type: 1,
              title: "Tambah Peserta Baru",
            })
          }
        >
          <Plus /> <Text className="md:block hidden">Tambah Baru</Text>
        </Button>
      </Flex>

      <Grid columns={"12"} gap={"5"}>
        <div className="md:col-span-6 lg:col-span-3 col-span-12">
          <Input
            className="me-3"
            type="search"
            placeholder="Cari berdasarkan nama dan akun"
            value={state.filters.search}
            onChange={(e) =>
              handler.setFilters({ ...state.filters, search: e.target.value })
            }
          />
        </div>
        <div className="col-span-12">
          <DataTable
            columns={columns({
              edit: handler.handleEdit,
              delete: handler.handleDelete,
              editPassword: handler.handleEditPassword,
            })}
            data={state.users}
            isLoadingData={state.isLoadingData}
          />
        </div>
      </Grid>
      <DataTablePagination
        metadata={state.metadata!}
        onPageChange={(e) =>
          handler.setPagination({ ...state.pagination, page: e })
        }
      />

      <Dialog
        open={state.visible.show}
        onOpenChange={() => handler.resetState()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{state.visible.title}</DialogTitle>
          </DialogHeader>
          <Form {...state.form}>
            <form
              onSubmit={
                state.visible.type == 1
                  ? state.form.handleSubmit(handler.handleSubmit)
                  : state.visible.type == 2
                  ? state.form.handleSubmit(handler.handleUpdate)
                  : state.form.handleSubmit(handler.handleUpdatePassword)
              }
              className="space-y-4"
            >
              {(state.visible.type == 1 || state.visible.type == 2) && (
                <>
                  <FormField
                    control={state.form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name">Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            type="text"
                            placeholder=""
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="text"
                            placeholder=""
                            {...field}
                            disabled={state.isLoadingForm}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {(state.visible.type == 1 || state.visible.type == 3) && (
                <FormField
                  control={state.form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Kata Sandi</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="text"
                          placeholder=""
                          {...field}
                          value={field.value || ""}
                          disabled={
                            state.visible.type == 1 || state.isLoadingForm
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <DialogFooter className="justify-content-between">
                {state.isLoadingForm ? (
                  <Button disabled>
                    <Loader2 className="animate-spin" />
                    Silahkan Tunggu
                  </Button>
                ) : (
                  <>
                    <DialogClose asChild>
                      <Button
                        variant="secondary"
                        onClick={() => handler.resetState()}
                        size="sm"
                      >
                        Batal
                      </Button>
                    </DialogClose>
                    <Button color="primary" size="sm" type="submit">
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
