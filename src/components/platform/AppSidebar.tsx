import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";
import { LayoutDashboard, LineChart, Tags, Users, Store, GitCompare } from "lucide-react";
import fairwoodLogo from "@/assets/fairwood-logo.png";

const groups = [
  {
    label: "Executive",
    items: [{ title: "Overview", url: "/", icon: LayoutDashboard }],
  },
  {
    label: "Planning",
    items: [
      { title: "Sales Prediction", url: "/prediction", icon: LineChart },
      { title: "Promo Recommendation", url: "/promotions", icon: Tags },
      { title: "Decision Analysis", url: "/decisions", icon: GitCompare },
    ],
  },
  {
    label: "Insights",
    items: [
      { title: "Segment Insights", url: "/segments", icon: Users },
      { title: "Store Rollout", url: "/stores", icon: Store },
    ],
  },
];

export function AppSidebar() {
  const { pathname } = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <img src={fairwoodLogo} alt="Fairwood" className="h-8 w-auto object-contain" />
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-[13px] font-bold text-foreground">Fairwood AI</span>
              <span className="text-[10px] text-muted-foreground">Growth Platform</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((g) => (
          <SidebarGroup key={g.label}>
            {!collapsed && <SidebarGroupLabel className="text-[10px] uppercase tracking-wider">{g.label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((item) => {
                  const active = item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                        <NavLink to={item.url} className="flex items-center gap-2">
                          <item.icon className="h-4 w-4 shrink-0" />
                          {!collapsed && <span className="text-sm">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
