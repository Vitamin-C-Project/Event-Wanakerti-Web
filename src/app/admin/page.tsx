import { API_PATH_CONSTANT } from "@/constants/api_constant";
import DashboardLayout from "@/layout/dashboard-layout";
import { postData } from "@/lib/utils";
import { useEffect } from "react";

export default function DashboardPage() {
  const getApp = async () => {
    try {
      const response = await postData(API_PATH_CONSTANT.APP, {});
    } catch (error) {}
  };

  useEffect(() => {
    getApp();
  }, []);

  return (
    <DashboardLayout breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </DashboardLayout>
  );
}
