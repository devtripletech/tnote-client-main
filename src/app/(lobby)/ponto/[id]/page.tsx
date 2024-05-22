import { SiteFooter } from "@/components/layouts/site-footer"
import React from "react"
import { GoBackButton } from "../_components/go-back-button"
import ReembolsoForm from "../_components/reembolso-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import getCurrentUser from "@/actions/getCurrentUser"
import { UserPayload } from "@/lib/validations/auth"
import { redirect } from "next/navigation"
import { getEmployeeByIdAction } from "@/actions/employee"

interface ReembolsoPageProps {
  params: {
    id: string | number
  }
}

export default async function ReembolsoPage({ params }: ReembolsoPageProps) {
  const user = (await getCurrentUser()) as UserPayload

  if (!user) {
    redirect("/")
  }

  const employee = await getEmployeeByIdAction(user.email)

  if (employee?.flexivel) {
    redirect("/dashboard/attendance")
  }

  return (
    <div className="flex flex-col items-center justify-start bg-muted min-h-screen">
      <div className="bg-primary dark:bg-background  w-full p-4  flex justify-between">
        <GoBackButton />

        <h1 className="text-xl font-bold text-center text-white">Reembolso</h1>

        <div></div>
      </div>

      <div className="flex-1 flex-col gap-4 max-w-4xl px-5 py-5 w-full">
        <Alert className="bg-yellow-100 dark:bg-background">
          <AlertCircle className="h-4 w-4" />
          {/* <AlertTitle>Error</AlertTitle> */}
          <AlertDescription>
            Este registro ficará pendente até a aprovação do seu Gestor.
          </AlertDescription>
        </Alert>
        <ReembolsoForm id={params.id} email={user.email} />
      </div>

      <SiteFooter />
    </div>
  )
}
