import * as React from "react";
import {
  CalendarDays,
  ChartBar,
  Command,
  Contact,
  Group,
  LayoutDashboard,
  LucideGrab,
  School,
  Target,
  Trello,
  User,
  Users,
  Video,
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
import { UserInterface } from "@/interfaces/user_interface";
import jsCookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { USER_TYPE_CONSTANT } from "@/constants/global_constant";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  menus: [
    {
      title: "Navigasi",
      role: [
        USER_TYPE_CONSTANT.ADMIN,
        USER_TYPE_CONSTANT.PARTICIPANT,
        USER_TYPE_CONSTANT.SUPER_ADMIN,
      ],
      items: [
        {
          title: "Dasbor",
          url: "/dashboard",
          icon: LayoutDashboard,
          children: [],
          role: [
            USER_TYPE_CONSTANT.ADMIN,
            USER_TYPE_CONSTANT.PARTICIPANT,
            USER_TYPE_CONSTANT.SUPER_ADMIN,
          ],
        },
        // {
        //   title: "Layout Member",
        //   url: "#member",
        //   icon: LayoutDashboard,
        //   children: [
        //     {
        //       title: "Dasbor",
        //       url: "/member",
        //     },
        //     {
        //       title: "Data Pangkalan",
        //       url: "/member/edit-school",
        //     },
        //     {
        //       title: "Data Tim",
        //       url: "/member/teams",
        //     },
        //     {
        //       title: "Data Peserta",
        //       url: "/member/participants",
        //     },
        //   ],
        // },
      ],
    },
    {
      title: "Member",
      role: [
        USER_TYPE_CONSTANT.ADMIN,
        USER_TYPE_CONSTANT.PARTICIPANT,
        USER_TYPE_CONSTANT.SUPER_ADMIN,
      ],
      items: [
        {
          title: "Data Pangkalan",
          url: "/dashboard/member/schools",
          icon: School,
          children: [],
          role: [
            USER_TYPE_CONSTANT.ADMIN,
            USER_TYPE_CONSTANT.PARTICIPANT,
            USER_TYPE_CONSTANT.SUPER_ADMIN,
          ],
        },
        {
          title: "Data Tim",
          url: "/dashboard/member/teams",
          icon: Group,
          children: [],
          role: [
            USER_TYPE_CONSTANT.ADMIN,
            USER_TYPE_CONSTANT.PARTICIPANT,
            USER_TYPE_CONSTANT.SUPER_ADMIN,
          ],
        },
        {
          title: "Data Peserta",
          url: "/dashboard/member/participants",
          icon: Users,
          children: [],
          role: [
            USER_TYPE_CONSTANT.ADMIN,
            USER_TYPE_CONSTANT.PARTICIPANT,
            USER_TYPE_CONSTANT.SUPER_ADMIN,
          ],
        },
      ],
    },
    {
      title: "Konten Manajemen",
      role: [USER_TYPE_CONSTANT.ADMIN, USER_TYPE_CONSTANT.SUPER_ADMIN],
      items: [
        {
          title: "Maskot & Logo",
          url: "/dashboard/cms/mascot-logo",
          icon: Target,
          children: [],
          role: [USER_TYPE_CONSTANT.ADMIN, USER_TYPE_CONSTANT.SUPER_ADMIN],
        },
        {
          title: "Agenda Kegiatan",
          url: "/dashboard/cms/agenda",
          icon: CalendarDays,
          children: [],
          role: [USER_TYPE_CONSTANT.ADMIN, USER_TYPE_CONSTANT.SUPER_ADMIN],
        },
        {
          title: "Kategori Lomba",
          url: "/dashboard/cms/categories",
          icon: ChartBar,
          children: [],
          role: [USER_TYPE_CONSTANT.ADMIN, USER_TYPE_CONSTANT.SUPER_ADMIN],
        },
        {
          title: "Video Lomba",
          url: "/dashboard/cms/video",
          icon: Video,
          children: [],
          role: [USER_TYPE_CONSTANT.ADMIN, USER_TYPE_CONSTANT.SUPER_ADMIN],
        },
        {
          title: "Brand & Sponsor",
          url: "/dashboard/cms/brand-sponsorship",
          icon: Trello,
          children: [],
          role: [USER_TYPE_CONSTANT.ADMIN, USER_TYPE_CONSTANT.SUPER_ADMIN],
        },
        {
          title: "Kontak Masuk",
          url: "/dashboard/cms/contact",
          icon: Contact,
          children: [],
          role: [USER_TYPE_CONSTANT.ADMIN, USER_TYPE_CONSTANT.SUPER_ADMIN],
        },
      ],
    },
    {
      title: "Pengaturan",
      role: [USER_TYPE_CONSTANT.ADMIN, USER_TYPE_CONSTANT.SUPER_ADMIN],
      items: [
        {
          title: "Data Divisi",
          url: "/dashboard/divisions",
          icon: LucideGrab,
          children: [],
          role: [USER_TYPE_CONSTANT.ADMIN, USER_TYPE_CONSTANT.SUPER_ADMIN],
        },
        {
          title: "Data Akun",
          url: "#",
          icon: User,
          role: [USER_TYPE_CONSTANT.ADMIN, USER_TYPE_CONSTANT.SUPER_ADMIN],
          children: [
            {
              title: "Admin",
              url: "/dashboard/users/admin",
              role: [USER_TYPE_CONSTANT.ADMIN, USER_TYPE_CONSTANT.SUPER_ADMIN],
            },
            {
              title: "Peserta",
              url: "/dashboard/users/participant",
              role: [USER_TYPE_CONSTANT.ADMIN, USER_TYPE_CONSTANT.SUPER_ADMIN],
            },
          ],
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  const [user, setUser] = React.useState<UserInterface>();

  const getUserAuth = async () => {
    try {
      const response = await postData(
        API_PATH_CONSTANT.AUTH.CHECK_AUTHENTICATED,
        {}
      );

      jsCookie.set("USER", JSON.stringify(response.data.data));
      setUser(response.data.data);
    } catch (error) {
      jsCookie.remove("LJJKPW");
      navigate("/auth/login");
    }
  };

  React.useEffect(() => {
    getUserAuth();
  }, []);

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
          <NavMain
            items={menu.items}
            title={menu.title}
            role={menu.role}
            key={index}
            user={user}
          />
        ))}
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
