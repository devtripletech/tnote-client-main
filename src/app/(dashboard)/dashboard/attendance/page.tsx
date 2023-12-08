import { Metadata } from "next"

import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import { Shell } from "@/components/shells/shell"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { getAttendanceAction } from "@/actions/attendance"
import { Suspense } from "react"
import { ButtonAction } from "./components/button-action"
import getCurrentUser from "@/actions/getCurrentUser"
import { notFound, redirect } from "next/navigation"
import { DefaultSession } from "next-auth"
import { UserPayload } from "@/lib/validations/auth"
import { checkPermissionForEmployee } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Lançamentos",
  description: "",
}

export default async function AttendancePage() {
  const user = (await getCurrentUser()) as UserPayload

  if (!user) {
    redirect("/")
  }

  if (checkPermissionForEmployee(user?.role)) {
    return notFound()
  }

  const attendances = await getAttendanceAction()

  return (
    <Shell variant="sidebar" className="">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2 flex-col">
          <PageHeaderHeading>Lançamentos</PageHeaderHeading>
          <PageHeaderDescription>
            Gerencie seus lançamentos
          </PageHeaderDescription>
        </div>
        <ButtonAction />
      </div>

      <Suspense fallback={"carregand..."}>
        <div className="relative w-full overflow-auto">
          <DataTable data={attendances} columns={columns} />
        </div>
      </Suspense>
    </Shell>
  )
}
