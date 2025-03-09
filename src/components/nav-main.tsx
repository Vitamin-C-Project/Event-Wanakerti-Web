import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Link } from "react-router-dom";
import { UserInterface } from "@/interfaces/user_interface";

export function NavMain({
  title = "",
  role,
  items,
  user,
}: {
  title?: string;
  role?: Array<number>;
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    role: Array<number>;
    children: {
      title: string;
      url: string;
      role: Array<number>;
    }[];
  }[];
  user?: UserInterface;
}) {
  const pathname = "dashboard";

  return (
    user && (
      // <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroup>
        {title.length > 0 && (
          <SidebarGroupLabel
            className="uppercase"
            hidden={!role?.includes(user?.role?.id!)}
          >
            {title}
          </SidebarGroupLabel>
        )}

        <SidebarMenu>
          {items.map((item) =>
            item.children.length < 1 ? (
              <SidebarMenuItem
                key={item.title}
                hidden={!item.role.includes(user?.role?.id!)}
              >
                <SidebarMenuButton asChild isActive={pathname == item.url}>
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.children.some(
                  (child) => pathname == child.url
                )}
                className="group/collapsible"
                hidden={!item.role.includes(user?.role?.id!)}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.children.map((child) => (
                        <SidebarMenuSubItem
                          key={child.title}
                          hidden={!child.role?.includes(user?.role?.id!)}
                        >
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname == child.url}
                          >
                            <Link to={child.url}>
                              <span>{child.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          )}
        </SidebarMenu>
      </SidebarGroup>
    )
  );
}
