import { Metadata } from "next"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import { Shell } from "@/components/shells/shell"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Suspense } from "react"
import { getProjectsAction } from "@/actions/project"
import getCurrentUser from "@/actions/getCurrentUser"
import { UserPayload } from "@/lib/validations/auth"
import { notFound, redirect } from "next/navigation"
import { checkPermissionForSales } from "@/lib/utils"
import { ButtonAction } from "./components/button-action"

export const metadata: Metadata = {
  title: "Projetos",
  description: "",
}

export default async function ProjectsPage() {
  const user = (await getCurrentUser()) as UserPayload

  if (!user) {
    redirect("/")
  }

  if (checkPermissionForSales(user?.role)) {
    return notFound()
  }

  const projects = await getProjectsAction()

  return (
    <Shell variant="sidebar">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2 flex-col">
          <PageHeaderHeading>Projetos</PageHeaderHeading>
          <PageHeaderDescription>Gerencie seus projetos</PageHeaderDescription>
        </div>
        <ButtonAction />
      </div>

      <Suspense fallback={"carregand..."}>
        <div className="relative w-full overflow-auto">
          <DataTable data={projects ?? []} columns={columns} />
        </div>
      </Suspense>
    </Shell>
  )
}
