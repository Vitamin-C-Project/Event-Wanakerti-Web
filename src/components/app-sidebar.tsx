import * as React from "react";
import {
  Command,
  Group,
  LayoutDashboard,
  LucideGrab,
  School,
  User,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { postData } from "@/lib/utils";
import { API_PATH_CONSTANT } from "@/constants/api_constant";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  menus: [
    {
      title: "Navigasi",
      items: [
        {
          title: "Dasbor",
          url: "/dashboard",
          icon: LayoutDashboard,
          children: [],
        },
        {
          title: "Layout Member",
          url: "#member",
          icon: LayoutDashboard,
          children: [
            {
              title: "Dasbor",
              url: "/member",
            },
            {
              title: "Data Pangkalan",
              url: "/member/edit-school",
            },
            {
              title: "Data Tim",
              url: "/member/teams",
            },
            {
              title: "Data Peserta",
              url: "/member/participants",
            },
          ],
        },
      ],
    },
    {
      title: "Member",
      items: [
        {
          title: "Data Pangkalan",
          url: "/dashboard/member/schools",
          icon: School,
          children: [],
        },
        {
          title: "Data Tim",
          url: "/dashboard/member/teams",
          icon: Group,
          children: [],
        },
        {
          title: "Data Peserta",
          url: "/dashboard/member/participants",
          icon: Users,
          children: [],
        },
      ],
    },
    {
      title: "Pengaturan",
      items: [
        {
          title: "Data Divisi",
          url: "/dashboard/divisions",
          icon: LucideGrab,
          children: [],
        },
        {
          title: "Data Akun",
          url: "#",
          icon: User,
          children: [
            {
              title: "Admin",
              url: "/dashboard/users/admin",
            },
            {
              title: "Peserta",
              url: "/dashboard/users/participant",
            },
          ],
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const getUserAuth = async () => {
  //   try {
  //     const response = await postData(API_PATH_CONSTANT.AUTH.LOGIN, {});
  //   } catch (error) {

  //   }
  // }

  // React.useEffect(() => {
  //   getUserAuth();
  // }, []);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.menus.map((menu, index) => (
          <NavMain items={menu.items} title={menu.title} key={index} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
