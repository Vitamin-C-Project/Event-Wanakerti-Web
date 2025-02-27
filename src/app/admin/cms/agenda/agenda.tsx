import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/layout/dashboard-layout";
import { Label } from "@radix-ui/react-label";
import { Flex, Grid, Heading } from "@radix-ui/themes";

export default function AgendaPage() {
  return (
    <DashboardLayout breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}>
      <Flex align={"center"} justify={"between"}>
        <Heading>Agenda Kegiatan</Heading>
      </Flex>

      <Card className="w-full">
        <CardContent>
          <Grid columns="12" className="gap-4">
            <Label className="col-span-4 w-full">Jadwal Kegiatan</Label>
            <Input className="w-full col-span-8" type="date" />
            <Label className="col-span-4 w-full">
              Jadwal Technical Meeting 1
            </Label>
            <Input className="w-full col-span-8" type="date" />
            <Label className="col-span-4 w-full">
              Jadwal Technical Meeting 2
            </Label>
            <Input className="w-full col-span-8" type="date" />
          </Grid>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="default">Simpan</Button>
        </CardFooter>
      </Card>
    </DashboardLayout>
  );
}
