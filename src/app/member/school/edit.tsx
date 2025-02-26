import RegisterPage from "@/app/member/(component)/register/register-school";
import DashboardLayout from "@/layout/dashboard-layout";

export default function EditSchoolPage() {
  return (
    <DashboardLayout breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}>
      <RegisterPage title="Edit Pangkalan" />
    </DashboardLayout>
  );
}
