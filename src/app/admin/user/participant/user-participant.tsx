import DashboardLayout from "@/layout/dashboard-layout";
import { columns } from "./columns";
import Hook from "./hook";
import { Flex, Heading } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/data-table";
import {
  Dialog,
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
        { title: "Pengguna", href: "/dashboard/users" },
        { title: "Peserta", href: "/dashboard/users/participant" },
      ]}
    >
      <Flex align={"center"} justify={"between"}>
        <Heading>Daftar Pengguna Peserta</Heading>
        <Button
          onClick={() =>
            handler.setVisible({
              show: true,
              type: 1,
              title: "Tambah Peserta Baru",
            })
          }
        >
          <Plus /> Tambah Baru
        </Button>
      </Flex>

      <DataTable
        columns={columns({
          edit: handler.handleEdit,
          delete: handler.handleDelete,
        })}
        data={state.users}
      />
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
                  : state.form.handleSubmit(handler.handleUpdate)
              }
              className="space-y-4"
            >
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
              {state.visible.type == 1 && (
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
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <DialogFooter className="justify-content-between">
                <Button
                  variant="secondary"
                  onClick={() => handler.resetState()}
                  size="sm"
                >
                  Batal
                </Button>
                <Button color="primary" size="sm" type="submit">
                  Simpan
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
