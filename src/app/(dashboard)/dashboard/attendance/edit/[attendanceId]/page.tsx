import { type Metadata } from "next"

import { notFound, redirect } from "next/navigation"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"

import getCurrentUser from "@/actions/getCurrentUser"

import { Project } from "@/lib/validations/project"
import { z } from "zod"
import getToken from "@/actions/getToken"
import { EditAttendanceForm } from "@/components/forms/edit-attendance-form"
import { getAttendanceByIdAction } from "@/actions/attendance"
import { getProjectsAction } from "@/actions/project"
import { UserPayload } from "@/lib/validations/auth"
import { Attendance } from "@/lib/validations/attendance"
import { checkPermissionForEmployee } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Lançamento",
  description: "",
}

interface AttendanceEditPageProps {
  params: {
    attendanceId: string | number
  }
}
export default async function AttendanceEditPage({
  params,
}: AttendanceEditPageProps) {
  const user = (await getCurrentUser()) as UserPayload

  if (!user) {
    redirect("/")
  }

  if (checkPermissionForEmployee(user?.role)) {
    return notFound()
  }

  const attendanceId = Number(params.attendanceId)
  if (!attendanceId) return notFound()

  let attendance

  try {
    attendance = await getAttendanceByIdAction(Number(attendanceId))
  } catch (error) {
    console.log(error)
  }

  if (!attendance) return notFound()

  const projects = (await getProjectsAction()) as Project[]

  const token = await getToken()

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="purchase-page-header"
        aria-labelledby="purchase-page-header-heading"
      >
        <PageHeaderHeading>Editar lançamento</PageHeaderHeading>
        {/* <PageHeaderDescription>editar lançamento</PageHeaderDescription> */}
      </PageHeader>
      <Card
        id="new-store-page-form-container"
        aria-labelledby="new-store-page-form-heading"
      >
        <CardHeader className="space-y-1">
          {/* <CardTitle className="text-2xl">Editar lançamento</CardTitle>
          <CardDescription>Editar lançamento</CardDescription> */}
        </CardHeader>
        <CardContent>
          <EditAttendanceForm
            userId={user?.email ?? ""}
            attendance={attendance}
            projects={projects}
            token={token ?? ""}
          />
        </CardContent>
      </Card>
    </Shell>
  )
}
