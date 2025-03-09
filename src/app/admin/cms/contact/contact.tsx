import { DataTable } from "@/components/data-table";
import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Heading } from "@radix-ui/themes";
import { columns } from "./columns";
import Hook from "./hook";
import { Input } from "@/components/ui/input";

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
      <Flex align={"center"} justify={"between"}>
        <Heading>Kontak Masuk</Heading>

        <div>
          <Input
            className="w-64"
            type="search"
            placeholder="Cari berdasarkan nama dan pesan"
          />
        </div>
      </Flex>

      <DataTable
        columns={columns({
          delete: handler.handleDelete,
          edit: () => {},
        })}
        data={state.contacts}
        isLoadingData={state.isLoadingData}
      />
    </DashboardLayout>
  );
}
