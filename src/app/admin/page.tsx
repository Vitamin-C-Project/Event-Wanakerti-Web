import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_PATH_CONSTANT } from "@/constants/api_constant";
import DashboardLayout from "@/layout/dashboard-layout";
import { postData } from "@/lib/utils";
import { Callout, Flex, Grid, Text, Tooltip } from "@radix-ui/themes";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import MaskotPng from "@/assets/img/maskot.png";
import LogoPng from "@/assets/img/logo-wanakerti.png";
import { useAppSelector } from "@/lib/hooks";
import { USER_TYPE_CONSTANT } from "@/constants/global_constant";

export default function DashboardPage() {
  const [app, setApp] = useState({});
  const [contents, setContents] = useState({});

  const user = useAppSelector((state) => state.user.userAuthenticated);

  const getApp = async () => {
    try {
      const response = await postData(API_PATH_CONSTANT.APP, {});

      setApp(response.data.data);
    } catch (error) {}
  };

  const getContents = async () => {
    try {
      const response = await postData(API_PATH_CONSTANT.CMS.ALL_CONTENT, {});

      setContents(response.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContents();
  }, []);

  useEffect(() => {
    getApp();
  }, []);

  return (
    <DashboardLayout breadcrumbs={[{ title: "Dasbor", href: "/dashboard" }]}>
      <Callout.Root>
        <Callout.Icon>
          <Info />
        </Callout.Icon>
        <Callout.Text>
          Selamat datang <strong>{user.name}</strong> di aplikasi{" "}
          <Tooltip content="Lomba Jelajah Jagat & Kreatifitas Pramuka Wanakerti">
            <strong>LJJKPW v{app.version}</strong>
          </Tooltip>
        </Callout.Text>
      </Callout.Root>

      {[USER_TYPE_CONSTANT.ADMIN, USER_TYPE_CONSTANT.SUPER_ADMIN].includes(
        user.role?.id!
      ) && (
        <Grid className="auto-rows-min gap-4" columns={{ md: "4", sm: "2" }}>
          <Card>
            <CardHeader>
              <CardTitle>Total Pangkalan</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="font-bold text-2xl">100</Text>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Pleton LKBBT</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="font-bold text-2xl">100</Text>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Tim Hiking</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="font-bold text-2xl">100</Text>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Peserta</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="font-bold text-2xl">100</Text>
            </CardContent>
          </Card>
        </Grid>
      )}

      <Grid className="auto-rows-min" gap={"4"} columns={{ md: "2" }}>
        <Card>
          <CardHeader>
            <Flex align={"center"} justify={"between"}>
              <CardTitle>Logo</CardTitle>
            </Flex>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <img
              src={contents.theme ? contents.theme.logo : LogoPng}
              alt=""
              style={{ height: 200 }}
              onError={(e) => (e.currentTarget.src = LogoPng)}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Flex align={"center"} justify={"between"}>
              <CardTitle>Maskot</CardTitle>
            </Flex>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <img
              src={contents.theme ? contents.theme.mascot : MaskotPng}
              alt=""
              style={{ height: 200 }}
              onError={(e) => (e.currentTarget.src = MaskotPng)}
            />
          </CardContent>
        </Card>
      </Grid>
    </DashboardLayout>
  );
}
