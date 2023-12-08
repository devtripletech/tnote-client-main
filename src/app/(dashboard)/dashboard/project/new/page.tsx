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
import { AddClientForm } from "@/components/forms/add-client-form"
import { checkPermissionForSales } from "@/lib/utils"
import { AddProjectForm } from "@/components/forms/add-project-form"
import { getEmployeesAction, getManagerAction } from "@/actions/employee"
import { getClientsAction } from "@/actions/client"

export const metadata: Metadata = {
  title: "Adicionar projeto",
  description: "",
}

export default async function ProjectNewPage() {
  const user = (await getCurrentUser()) as UserPayload
  if (!user) {
    redirect("/")
  }

  if (checkPermissionForSales(user?.role)) {
    return notFound()
  }

  const employees = await getManagerAction()
  const clients = await getClientsAction()

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="purchase-page-header"
        aria-labelledby="purchase-page-header-heading"
      >
        <PageHeaderHeading>Novo projeto</PageHeaderHeading>
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
          <AddProjectForm employees={employees} clients={clients} />
        </CardContent>
      </Card>
    </Shell>
  )
}
