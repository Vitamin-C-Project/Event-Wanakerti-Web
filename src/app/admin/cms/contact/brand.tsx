import { DataTable } from "@/components/data-table";
import { BrandInterface, ContactInterface } from "@/interfaces/cms_interface";
import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Heading } from "@radix-ui/themes";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const contacts = [
    {
      id: 1,
      name: "Name 1",
      email: "name.1@mailinator.com",
      message: "Message 1",
    },
    {
      id: 2,
      name: "Name 2",
      email: "name.2@mailinator.com",
      message: "Message 2",
    },
    {
      id: 3,
      name: "Name 3",
      email: "name.3@mailinator.com",
      message: "Message 3",
    },
  ] as ContactInterface[];

  const [visible, setVisible] = useState({
    show: false,
    type: 1,
    title: "",
  });

  return (
    <DashboardLayout breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}>
      <Flex align={"center"} justify={"between"}>
        <Heading>Kontak Masuk</Heading>
      </Flex>

      <DataTable
        columns={columns({
          delete: () => {},
          edit: () => {},
        })}
        data={contacts}
      />

      <Dialog
        open={visible.show}
        onOpenChange={() => setVisible({ show: false, title: "", type: 1 })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{visible.title}</DialogTitle>
          </DialogHeader>
          <div>
            <Label className="font-semibold">Nama Brand</Label>
            <Input type="text" />
          </div>
          <div>
            <Label className="font-semibold">Upload Gambar</Label>
            <Input type="file" />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Tutup
              </Button>
            </DialogClose>
            <Button variant="default">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
