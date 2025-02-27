import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/layout/dashboard-layout";
import { Flex, Heading } from "@radix-ui/themes";
import { useState } from "react";

export default function VideoPage() {
  const [visible, setVisible] = useState({
    show: false,
    title: "",
    type: 1,
  });

  return (
    <DashboardLayout breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}>
      <Flex align={"center"} justify={"between"}>
        <Heading>Video Lomba</Heading>
        <Button
          variant="default"
          onClick={() =>
            setVisible({
              show: true,
              title: "Ubah Video",
              type: 1,
            })
          }
        >
          Ubah Video
        </Button>
      </Flex>

      <Card className="w-full">
        <CardContent>
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </CardContent>
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
