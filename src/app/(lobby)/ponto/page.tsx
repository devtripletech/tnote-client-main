import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import getCurrentUser from "@/actions/getCurrentUser"
import { UserPayload } from "@/lib/validations/auth"
import { redirect } from "next/navigation"
import { getEmployeeByIdAction } from "@/actions/employee"
import { SiteFooter } from "@/components/layouts/site-footer"
import { GoBackButton } from "./_components/go-back-button"
import { getWeekday } from "@/lib/utils"
import { PontoDetails } from "./_components/ponto-details"
import { ReembolsoResponse, getReembolsoList } from "@/actions/ponto"
import { RegistrarPontoButton } from "./_components/registrar-ponot-button"

export default async function PontoPage() {
  const user = (await getCurrentUser()) as UserPayload

  if (!user) {
    redirect("/")
  }

  const employee = await getEmployeeByIdAction(user.email)

  if (employee?.flexivel) {
    redirect("/dashboard/attendance")
  }

  const reembolsos = await getReembolsoList(user.email)

  return (
    <div className="flex flex-col items-center justify-start bg-muted min-h-screen">
      <div className="bg-primary dark:bg-background  w-full p-4  flex justify-between">
        <GoBackButton />

        <h1 className="text-xl font-bold text-center text-white">Meu Ponto</h1>

        <RegistrarPontoButton />
      </div>
      <div className="flex items-center justify-between max-w-4xl px-5 w-full my-2">
        <Input className="flex-1" placeholder="Itens de busca" />
        <div className="flex flex-col justify-center items-center mx-2 gap-2">
          <span className="text-xs text-muted-foreground">reembolso</span>
          <Switch className="ml-2" id="search-toggle" />
        </div>
      </div>
      <ScrollArea className="flex-1 max-w-4xl px-5 w-full mb-4">
        <div className="flex flex-col gap-4">
          {reembolsos &&
            reembolsos.length > 0 &&
            reembolsos.map((ponto, i: number) => (
              <PontoDetails key={i} ponto={ponto} />
            ))}
        </div>
      </ScrollArea>
      <SiteFooter />
    </div>
  )
}
