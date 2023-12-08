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
import { AddAttendanceForm } from "@/components/forms/add-attendance-form"
import getCurrentUser from "@/actions/getCurrentUser"
import { Project } from "@/lib/validations/project"
import { addAttendanceSchema } from "@/lib/validations/attendance"
import { z } from "zod"
import { getAttendanceAction } from "@/actions/attendance"
import getToken from "@/actions/getToken"
import { Toaster } from "sonner"
import { Button } from "@/components/ui/button"
import { getProjectsAction } from "@/actions/project"
import { UserPayload } from "@/lib/validations/auth"
import { checkPermissionForEmployee } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Lançamento",
  description: "",
}

export default async function AttendanceNewPage() {
  const user = (await getCurrentUser()) as UserPayload
  if (!user) {
    redirect("/")
  }

  if (checkPermissionForEmployee(user?.role)) {
    return notFound()
  }

  const projects = (await getProjectsAction()) as Project[]

  const token = await getToken()

  // if (!user) {
  //   redirect("/signin")
  // }

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="purchase-page-header"
        aria-labelledby="purchase-page-header-heading"
      >
        <PageHeaderHeading>Novo lançamento</PageHeaderHeading>
        {/* <PageHeaderDescription>
          adicionar um novo lançamento
        </PageHeaderDescription> */}
      </PageHeader>
      <Card
        id="new-store-page-form-container"
        aria-labelledby="new-store-page-form-heading"
      >
        <CardHeader className="space-y-1">
          {/* <CardTitle className="text-2xl">Adicionar lançamento</CardTitle>
          <CardDescription>Adicionar um novo lançamento</CardDescription> */}
        </CardHeader>
        <CardContent>
          <AddAttendanceForm
            user={user}
            projects={projects}
            token={token ?? ""}
          />
        </CardContent>
      </Card>
    </Shell>
  )
}
