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

import { listEmployeeReportAction } from "@/actions/report"

export const metadata: Metadata = {
  title: "Extrato",
  description: "",
}

export default async function EmployeeReportPage() {
  const user = (await getCurrentUser()) as UserPayload

  if (!user) {
    redirect("/")
  }

  if (checkPermissionForEmployee(user?.role)) {
    return notFound()
  }

  const employeeReport = await listEmployeeReportAction(user?.email)

  return (
    <Shell variant="sidebar">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2 flex-col">
          <PageHeaderHeading>Extrato</PageHeaderHeading>
          <PageHeaderDescription>
            Gerencie extratos dos funcionários
          </PageHeaderDescription>
        </div>
      </div>

      <Suspense fallback={"carregand..."}>
        <div className="relative w-full overflow-auto">
          <DataTable data={employeeReport} columns={columns} />
        </div>
      </Suspense>
    </Shell>
  )
}
