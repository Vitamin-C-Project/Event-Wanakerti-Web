import { DataTable } from "@/components/data-table";
import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Heading } from "@radix-ui/themes";
import { columns } from "./columns";
import Hook from "./hook";

export default function ContactPage() {
  const { state, handler } = Hook();

  return (
    <DashboardLayout breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}>
      <Flex align={"center"} justify={"between"}>
        <Heading>Kontak Masuk</Heading>
      </Flex>

      <DataTable
        columns={columns({
          delete: handler.handleDelete,
          edit: () => {},
        })}
        data={state.contacts}
      />
    </DashboardLayout>
  );
}
