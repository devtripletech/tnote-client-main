import type { FooterItem, MainNavItem } from "@/types"


export type SiteConfig = typeof siteConfig

const links = {
  twitter: "https://twitter.com/sadmann17",
  github: "https://github.com/sadmann7/skateshop",
  githubAccount: "https://github.com/sadmann7",
  discord: "https://discord.com/users/sadmann7",
  calDotCom: "https://cal.com/sadmann7",
}

export const siteConfig = {
  name: "TNote",
  description:
    "Registrem com facilidade o tempo dedicado a suas tarefas e projetos.",
  url: "#",
  ogImage: "/logo.svg",
  mainNav: [
    {
      title: "Dashboard",
      items: [
        {
          title: "Cliente",
          href: "/dashboard/client",
          description: "Gerencie seus clientes.",
          items: [],
        },
        {
          title: "Projeto",
          href: "/dashboard/project",
          description: "Gerencie seus projetos.",
          items: [],
        },
        {
          title: "Funcionário",
          href: "/dashboard/employee",
          description: "Gerencie seus funcionários.",
          items: [],
        },
      ],
    },
  ] satisfies MainNavItem[],
  links,
  footerNav: [
    {
      title: "Credits",
      items: [
        
        {
          title: "Acme Corp",
          href: "https://acme-corp.jumr.dev",
          external: true,
        },
        
        {
          title: "Taxonomy",
          href: "https://tx.shadcn.com/",
          external: true,
        },
        {
          title: "shadcn/ui",
          href: "https://ui.shadcn.com",
          external: true,
        },
      ],
    },
   
  ] satisfies FooterItem[],
}
