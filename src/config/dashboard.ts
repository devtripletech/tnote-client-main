import getCurrentUser from "@/actions/getCurrentUser"
import { UserPayload } from "@/lib/validations/auth"
import { type SidebarNavItem } from "@/types"

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}
export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Cliente",
      href: "/dashboard/client",
      icon: "users",
      items: [],
      showForRole: [5, 3, 4],
    },
    {
      title: "Projeto",
      href: "/dashboard/project",
      icon: "pencilRuler",
      items: [],
      showForRole: [5, 3, 4],
    },
    {
      title: "Funcionário",
      href: "/dashboard/employee",
      icon: "userSquare2",
      items: [],
      showForRole: [2, 3, 4],
    },
    {
      title: "Lançamento",
      href: "/dashboard/attendance",
      icon: "timer",
      items: [],
      showForRole: [1, 2, 3, 4, 5],
    },
    {
      title: "Extrato",
      href: "/dashboard/report/extrato",
      icon: "fileSignature",
      items: [],
      showForRole: [1, 2, 3, 4, 5],
    },
    {
      title: "Despesas projeto",
      href: "/dashboard/report/project-expense",
      icon: "fileSignature",
      items: [],
      showForRole: [1, 2, 3, 4, 5],
    },
  ],
}
