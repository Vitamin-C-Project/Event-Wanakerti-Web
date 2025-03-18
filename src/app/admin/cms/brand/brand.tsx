import { DataTable } from "@/components/data-table";
import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Hook from "./hook";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DataTablePagination } from "@/components/pagination-datatable";

export default function BrandPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Konten Manajemen", href: "/dashboard/cms/brand-sponsorship" },
        { title: "Brand & Sponsor", href: "/dashboard/cms/brand-sponsorship" },
      ]}
    >
      <Flex align={"center"} justify={"between"} gap={"4"} className="mb-4">
        <Heading>Brand & Sponsor</Heading>

        <Button
          onClick={() =>
            handler.setVisible({
              show: true,
              type: 1,
              title: "Tambah Brand / Sponsor Baru",
            })
          }
        >
          <Plus /> <Text className="md:block hidden">Tambah Baru</Text>
        </Button>
      </Flex>

      <Grid columns={"12"} gap={"5"}>
        <div className="md:col-span-6 lg:col-span-3 col-span-12">
          <Input
            className="w-full me-3"
            type="search"
            placeholder="Cari berdasarkan nama"
            value={state.filters.search}
            onChange={(e) =>
              handler.setFilters({ ...state.filters, search: e.target.value })
            }
          />
        </div>
        <div className="col-span-12">
          <DataTable
            columns={columns({
              delete: handler.handleDelete,
              edit: () => {},
            })}
            data={state.brands}
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Nama Brand / Sponsor</FormLabel>
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
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="image">Unggah Gambar</FormLabel>
                    <FormControl>
                      <Input
                        id="image"
                        type="file"
                        disabled={state.isLoadingForm}
                        onChange={(event: any) => {
                          field.onChange(event.target.files[0]);
                        }}
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
                    Tunggu Sebentar
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
