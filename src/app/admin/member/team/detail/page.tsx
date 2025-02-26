import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Heading } from "@radix-ui/themes";
import { useParams } from "react-router-dom";

export default function DetailTeamPage() {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <Flex align={"center"} justify={"between"}>
        <Heading>Detail Penilaian {id}</Heading>
      </Flex>

      <div className="table-auto relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>POS 1</TableHead>
              <TableHead>POS 2</TableHead>
              <TableHead>POS 3</TableHead>
              <TableHead>POS 4</TableHead>
              <TableHead>POS 5</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>80</TableCell>
              <TableCell>75</TableCell>
              <TableCell>70</TableCell>
              <TableCell>80</TableCell>
              <TableCell>90</TableCell>
              <TableCell className="font-bold">340</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
