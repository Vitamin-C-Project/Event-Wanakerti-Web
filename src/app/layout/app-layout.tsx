import "@/App.css";
import "@radix-ui/themes/styles.css";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return <Outlet />;
}
