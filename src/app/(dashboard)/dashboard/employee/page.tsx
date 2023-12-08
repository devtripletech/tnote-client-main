import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"
import { Metadata } from "next"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import { Shell } from "@/components/shells/shell"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import getCurrentUser from "@/actions/getCurrentUser"
import { getEmployeesAction } from "@/actions/employee"
import { Suspense } from "react"
import { UserPayload } from "@/lib/validations/auth"
import { notFound, redirect } from "next/navigation"
import {
  checkPermissionForAdministrative,
  checkPermissionForEmployee,
} from "@/lib/utils"
import { Employee } from "@/lib/validations/employee"
import { ButtonAction } from "./components/button-action"

export const metadata: Metadata = {
  title: "Funcionários",
  description: "",
}

export default async function EmployeesPage() {
  const user = (await getCurrentUser()) as UserPayload

  if (!user) {
    redirect("/")
  }

  if (checkPermissionForAdministrative(user?.role)) {
    return notFound()
  }

  const employees = await getEmployeesAction()
  return (
    <Shell variant="sidebar">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2 flex-col">
          <PageHeaderHeading>Funcionários</PageHeaderHeading>
          <PageHeaderDescription>
            Gerencie seus funcionários
          </PageHeaderDescription>
        </div>
        <ButtonAction />
      </div>

      <Suspense fallback={"carregand..."}>
        <div className="relative w-full overflow-auto">
          <DataTable data={employees} columns={columns} />
        </div>
      </Suspense>
    </Shell>
  )
}
