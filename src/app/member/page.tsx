import DashboardLayout from "@/layout/dashboard-layout";
import RegisterSchool from "./(component)/register/register-school";
import store from "store";

export default function DashboardPage() {
  return (
    <DashboardLayout breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}>
      {store.get("participantSchool") ? null : (
        <RegisterSchool title="Registrasi Pangkalan" />
      )}
    </DashboardLayout>
  );
}
