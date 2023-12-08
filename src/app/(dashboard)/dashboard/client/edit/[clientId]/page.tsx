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
import { getClientByIdAction } from "@/actions/client"
import { checkPermissionForSales } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Cliente",
  description: "",
}

interface ClientEditPageProps {
  params: {
    clientId: string | number
  }
}

export default async function ClientEditPage({ params }: ClientEditPageProps) {
  const user = (await getCurrentUser()) as UserPayload

  if (!user) {
    redirect("/")
  }

  if (checkPermissionForSales(user?.role)) {
    return notFound()
  }

  const clientId = Number(params.clientId)
  if (!clientId) return notFound()
  const client = await getClientByIdAction(Number(clientId))

  if (!client) return notFound()

  return (
    <Shell variant="sidebar">
      <PageHeader
        id="purchase-page-header"
        aria-labelledby="purchase-page-header-heading"
      >
        <PageHeaderHeading>Editar cliente</PageHeaderHeading>
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
          <EditClientForm client={client} clientId={clientId} />
        </CardContent>
      </Card>
    </Shell>
  )
}
