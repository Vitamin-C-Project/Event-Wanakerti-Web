import { DataTable } from "@/components/data-table";
import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Heading } from "@radix-ui/themes";
import { columns } from "./columns";
import { CategoryInterface } from "@/interfaces/cms_interface";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";

export default function CategoriesPage() {
  const categories = [
    {
      division: {
        name: "Hiking Penegak Putra",
        markings: "[]",
        school_type: { name: "SMK/SMA/MA" },
        price: "100.000",
      },
      description: "Lomba hiking untuk penegak putra",
      image: "https://soundsfest.com/wp-content/uploads/2024/05/img.png",
    },
    {
      division: {
        name: "Hiking Penegak Putri",
        markings: "[]",
        school_type: { name: "SMK/SMA/MA" },
        price: "100.000",
      },
      description: "Lomba hiking untuk penegak putra",
      image: "https://soundsfest.com/wp-content/uploads/2024/05/img.png",
    },
    {
      division: {
        name: "Hiking Penggalang Putra",
        markings: "[]",
        school_type: { name: "SMP/MTs" },
        price: "100.000",
      },
      description: "Lomba hiking untuk penegak putra",
      image: "https://soundsfest.com/wp-content/uploads/2024/05/img.png",
    },
    {
      division: {
        name: "Hiking Penggalang Putri",
        markings: "[]",
        school_type: { name: "SMP/MTs" },
        price: "100.000",
      },
      description: "Lomba hiking untuk penegak putra",
      image: "https://soundsfest.com/wp-content/uploads/2024/05/img.png",
    },
    {
      division: {
        name: "LKBBT Penegak",
        markings: "[]",
        school_type: { name: "SMK/SMA/MA" },
        price: "100.000",
      },
      description: "Lomba hiking untuk penegak putra",
      image: "https://soundsfest.com/wp-content/uploads/2024/05/img.png",
    },
    {
      division: {
        name: "LKBBT Penggalang",
        markings: "[]",
        school_type: { name: "SMP/MTs" },
        price: "100.000",
      },
      description: "Lomba hiking untuk penegak putra",
      image: "https://soundsfest.com/wp-content/uploads/2024/05/img.png",
    },
  ] as CategoryInterface[];

  const [visible, setVisible] = useState({
    show: false,
    type: 1,
    title: "",
  });

  return (
    <DashboardLayout breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}>
      <Flex align={"center"} justify={"between"}>
        <Heading>Kategori Lomba</Heading>
        <Button
          onClick={() =>
            setVisible({
              show: true,
              type: 1,
              title: "Tambah Kategori Baru",
            })
          }
        >
          <Plus /> Tambah Baru
        </Button>
      </Flex>

      <DataTable
        columns={columns({
          edit: () =>
            setVisible({
              show: true,
              type: 1,
              title: "Edit Kategori",
            }),
          delete: () => {},
        })}
        data={categories}
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
            <Label className="font-semibold">Divisi</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Divisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem value={category.division.name}>
                      {category.division.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="font-semibold">Deskripsi</Label>
            <Textarea placeholder="Deskripsi" />
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
