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
import { UserPayload } from "@/lib/validations/auth"
import { EditClientForm } from "@/components/forms/edit-client-form"
import { getClientByIdAction, getClientsAction } from "@/actions/client"
import { checkPermissionForSales } from "@/lib/utils"
import { getProjectByIdAction } from "@/actions/project"
import { getEmployeesAction, getManagerAction } from "@/actions/employee"
import { EditProjectForm } from "@/components/forms/edit-project-form"

export const metadata: Metadata = {
  title: "Editar projeto",
  description: "",
}

interface ProjectEditPageProps {
  params: {
    projectId: string | number
  }
}

export default async function ProjectEditPage({
  params,
}: ProjectEditPageProps) {
  const user = (await getCurrentUser()) as UserPayload

  if (!user) {
    redirect("/")
  }

  if (checkPermissionForSales(user?.role)) {
    return notFound()
  }

  const projectId = Number(params.projectId)
  if (!projectId) return notFound()
  const project = await getProjectByIdAction(Number(projectId))

  if (!project) return notFound()

  const employees = await getManagerAction()

  const clients = await getClientsAction()

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="purchase-page-header"
        aria-labelledby="purchase-page-header-heading"
      >
        <PageHeaderHeading>Editar projeto</PageHeaderHeading>
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
          <EditProjectForm
            project={project}
            employees={employees}
            clients={clients}
            projectId={projectId}
          />
        </CardContent>
      </Card>
    </Shell>
  )
}
