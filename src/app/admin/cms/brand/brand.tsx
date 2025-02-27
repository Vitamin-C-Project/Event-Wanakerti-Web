import { DataTable } from "@/components/data-table";
import { BrandInterface } from "@/interfaces/cms_interface";
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

export default function BrandPage() {
  const brands = [
    {
      id: 1,
      title: "Brand 1",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Brand 2",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Brand 3",
      image: "https://via.placeholder.com/150",
    },
  ] as BrandInterface[];

  const [visible, setVisible] = useState({
    show: false,
    type: 1,
    title: "",
  });

  return (
    <DashboardLayout breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}>
      <Flex align={"center"} justify={"between"}>
        <Heading>Brand & Sponsor</Heading>
        <Button
          onClick={() =>
            setVisible({
              show: true,
              type: 1,
              title: "Tambah Brand Baru",
            })
          }
        >
          <Plus /> Tambah Baru
        </Button>
      </Flex>

      <DataTable
        columns={columns({
          delete: () => {},
          edit: () => {},
        })}
        data={brands}
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
