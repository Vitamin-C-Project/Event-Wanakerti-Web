import { DataTable } from "@/components/data-table";
import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Grid, Heading } from "@radix-ui/themes";
import { columns } from "./columns";
import Hook from "./hook";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/pagination-datatable";

export default function ContactPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Konten Manajemen", href: "/dashboard/cms/contact" },
        { title: "Kontak Masuk", href: "/dashboard/cms/contact" },
      ]}
    >
      <Flex align={"center"} justify={"between"} gap={"4"} className="mb-4">
        <Heading>Kontak Masuk</Heading>
      </Flex>

      <Grid columns={"12"} gap={"5"}>
        <div className="md:col-span-6 lg:col-span-3 col-span-12">
          <Input
            type="search"
            placeholder="Cari berdasarkan nama dan pesan"
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
            data={state.contacts}
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
    </DashboardLayout>
  );
}
