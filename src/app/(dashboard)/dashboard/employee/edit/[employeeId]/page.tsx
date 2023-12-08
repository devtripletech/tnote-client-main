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
import {
  checkPermissionForAdministrative,
  checkPermissionForSales,
} from "@/lib/utils"
import { getProjectByIdAction } from "@/actions/project"
import {
  getEmployeeByIdAction,
  getEmployeeCityAction,
  getEmployeeHoursAction,
  getEmployeePositionAction,
  getEmployeesAction,
  getManagerAction,
} from "@/actions/employee"
import { EditProjectForm } from "@/components/forms/edit-project-form"
import { EditEmployeeForm } from "@/components/forms/edt-employee-form"
import { toast } from "sonner"

export const metadata: Metadata = {
  title: "Editar funcionário",
  description: "",
}

interface EmployeeEditPageProps {
  params: {
    employeeId: string
  }
}

export default async function EmployeeEditPage({
  params,
}: EmployeeEditPageProps) {
  const user = (await getCurrentUser()) as UserPayload

  if (!user) {
    redirect("/")
  }

  if (checkPermissionForAdministrative(user?.role)) {
    return notFound()
  }

  const employeeId = params.employeeId

  if (!employeeId) return notFound()

  const employee = await getEmployeeByIdAction(employeeId)

  if (!employee) return notFound()

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
        <PageHeaderHeading>Editar funcionário</PageHeaderHeading>
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
          <EditEmployeeForm
            employee={employee}
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
