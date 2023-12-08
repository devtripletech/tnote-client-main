import { Metadata } from "next"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import { Shell } from "@/components/shells/shell"
import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import getCurrentUser from "@/actions/getCurrentUser"
import { Suspense } from "react"
import { UserPayload } from "@/lib/validations/auth"
import { notFound, redirect } from "next/navigation"
import { checkPermissionForEmployee } from "@/lib/utils"

import {
  listEmployeeReportAction,
  listProjectExpenseReportAction,
} from "@/actions/report"
import { DataTableToolbar } from "./components/data-table-toolbar"

export const metadata: Metadata = {
  title: "Relatório",
  description: "Relatório despesas projeto Detalhado",
}

export default async function ProjectExpenseReportPage() {
  const user = (await getCurrentUser()) as UserPayload

  if (!user) {
    redirect("/")
  }

  if (checkPermissionForEmployee(user?.role)) {
    return notFound()
  }

  return (
    <Shell variant="sidebar">
      {/* TODO: remover */}

      <Suspense fallback={"carregand..."}>
        <div className="relative w-full overflow-auto">
          <DataTable columns={columns} userId={user?.email} />
        </div>
      </Suspense>
    </Shell>
  )
}
