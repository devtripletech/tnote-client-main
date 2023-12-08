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
import {
  checkPermissionForAdministrative,
  checkPermissionForSales,
} from "@/lib/utils"
import { AddProjectForm } from "@/components/forms/add-project-form"
import {
  getEmployeeCityAction,
  getEmployeeHoursAction,
  getEmployeePositionAction,
  getEmployeesAction,
  getManagerAction,
} from "@/actions/employee"
import { getClientsAction } from "@/actions/client"
import { AddEmployeeForm } from "@/components/forms/add-employee-form"

export const metadata: Metadata = {
  title: "Adicionar funcionário",
  description: "",
}

export default async function EmployeeNewPage() {
  const user = (await getCurrentUser()) as UserPayload
  if (!user) {
    redirect("/")
  }

  if (checkPermissionForAdministrative(user?.role)) {
    return notFound()
  }

  const employees = await getManagerAction()
  const clients = await getClientsAction()
  const employeeHours = await getEmployeeHoursAction()
  const employeeCity = await getEmployeeCityAction()
  const employeePosition = await getEmployeePositionAction()

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="purchase-page-header"
        aria-labelledby="purchase-page-header-heading"
      >
        <PageHeaderHeading>Novo funcionário</PageHeaderHeading>
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
          <AddEmployeeForm
            employees={employees}
            clients={clients}
            employeeHours={employeeHours}
            employeeCity={employeeCity}
            employeePosition={employeePosition}
          />
        </CardContent>
      </Card>
    </Shell>
  )
}
