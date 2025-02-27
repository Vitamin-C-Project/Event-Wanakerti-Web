import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Grid, Heading } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MaskotPng from "@/assets/img/maskot.png";
import LogoPng from "@/assets/img/logo-wanakerti.png";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

export default function MascotLogoPage() {
  const [visible, setVisible] = useState({
    show: false,
    title: "",
    type: 1,
  });

  return (
    <DashboardLayout breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}>
      <Flex align={"center"} justify={"between"}>
        <Heading>Maskot & Logo</Heading>
      </Flex>

      <Grid columns="12" className="gap-4">
        <Card className="w-full col-span-12 sm:col-span-6">
          <CardHeader>
            <Flex align={"center"} justify={"between"}>
              <CardTitle>Maskot</CardTitle>
              <Button
                variant="default"
                onClick={() =>
                  setVisible({
                    show: true,
                    title: "Ubah Maskot",
                    type: 1,
                  })
                }
              >
                Ubah Maskot
              </Button>
            </Flex>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <img src={MaskotPng} alt="" style={{ height: 200 }} />
          </CardContent>
        </Card>
        <Card className="w-full col-span-12 sm:col-span-6">
          <CardHeader>
            <Flex align={"center"} justify={"between"}>
              <CardTitle>Logo</CardTitle>
              <Button
                variant="default"
                onClick={() =>
                  setVisible({
                    show: true,
                    title: "Ubah Logo",
                    type: 1,
                  })
                }
              >
                Ubah Logo
              </Button>
            </Flex>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <img src={LogoPng} alt="" style={{ height: 200 }} />
          </CardContent>
        </Card>
      </Grid>

      <Card className="w-full">
        <CardHeader>
          <Flex align={"center"} justify={"between"}>
            <CardTitle>Tema Kegiatan</CardTitle>
          </Flex>
        </CardHeader>
        <CardContent>
          <Grid columns="12" className="gap-4">
            <Label className="col-span-4 w-full">Judul Lengkap</Label>
            <Input
              className="w-full col-span-8"
              defaultValue={
                "Lomba Jelagah Jagat & Kreatifitas Pramuka Wanakerti 2025"
              }
            />
            <Label className="col-span-4 w-full">Judul Singkatan</Label>
            <Input className="w-full col-span-8" defaultValue={"LJJKPW"} />
            <Label className="col-span-4 w-full">Nama Pangkalan</Label>
            <Input
              className="w-full col-span-8"
              defaultValue={"SMK Negeri 1 Losarang Indramayu"}
            />
            <Label className="col-span-4 w-full">Nama Gudep</Label>
            <Input className="w-full col-span-8" defaultValue={"Wanakerti"} />
          </Grid>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="default">Simpan</Button>
        </CardFooter>
      </Card>

      <Dialog
        open={visible.show}
        onOpenChange={() => setVisible({ show: false, title: "", type: 1 })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{visible.title}</DialogTitle>
          </DialogHeader>
          <Input type="file" />
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
