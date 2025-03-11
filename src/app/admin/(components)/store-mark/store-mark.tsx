import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserInterface } from "@/interfaces/user_interface";
import { Heading, Text } from "@radix-ui/themes";

export default function StoreMark({ user }: { user: UserInterface }) {
  return (
    <>
      <Heading>Data Penilaian - {user.marking?.name}</Heading>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tim</TableHead>
              <TableHead>POS 1</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 50 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>Team {index + 1}</TableCell>
                <TableCell>
                  <Input defaultValue={"100"} />
                </TableCell>
                <TableCell>
                  <Button>Simpan</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
