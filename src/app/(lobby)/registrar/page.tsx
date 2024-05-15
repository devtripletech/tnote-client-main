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

export default async function Registrar() {
  const user = (await getCurrentUser()) as UserPayload

  if (!user) {
    redirect("/")
  }

  const employee = await getEmployeeByIdAction(user.email)

  if (employee?.flexivel) {
    redirect("/dashboard/attendance")
  }

  return (
    <div className="flex flex-col items-center justify-start bg-[#F2F2F2] h-full">
      <div className="bg-primary w-full p-4  flex justify-between">
        <Button>
          <ArrowLeft />
        </Button>

        <h1 className="text-xl font-bold text-center text-white">Meu Ponto</h1>

        <Button variant="outline">Reembolso</Button>
      </div>
      <div className="flex items-center justify-between p-4 w-full">
        <Input className="flex-1" placeholder="Itens de busca" />
        <Switch className="ml-2" id="search-toggle" />
      </div>
      <ScrollArea className="flex-1 w-5/6 ">
        <div className="flex flex-col gap-4">
          <Card className="flex justify-between p-4 items-center">
            <div>
              <div className="font-bold">15/05/2024</div>
              <div>08:53</div>
              <div>KM:</div>
              <div>Demais despesas: 0</div>
            </div>
            <ArrowRight className="text-red-600" />
          </Card>
          <Card className="flex justify-between p-4">
            <div>
              <div className="font-bold">14/05/2024</div>
              <div>08:50 - 14:53 - 15:53 - 18:08</div>
              <div>KM:</div>
              <div>Demais despesas: 0</div>
            </div>
            <ArrowRight className="text-red-600" />
          </Card>
          <Card className="flex justify-between p-4">
            <div>
              <div className="font-bold">13/05/2024</div>
              <div>08:50 - 14:39 - 15:39 - 18:07</div>
              <div>KM:</div>
              <div>Demais despesas: 0</div>
            </div>
            <ArrowRight className="text-red-600" />
          </Card>
          <Card className="flex justify-between p-4">
            <div>
              <div className="font-bold">12/05/2024</div>
              <div>KM:</div>
              <div>Demais despesas: 0</div>
            </div>
            <ArrowRight className="text-red-600" />
          </Card>
          <Card className="flex justify-between p-4">
            <div>
              <div className="font-bold">11/05/2024</div>
              <div>KM:</div>
              <div>Demais despesas: 0</div>
            </div>
            <ArrowRight className="text-red-600" />
          </Card>
          <Card className="flex justify-between p-4">
            <div>
              <div className="font-bold">10/05/2024</div>
              <div>KM:</div>
              <div>Demais despesas: 0</div>
            </div>
            <ArrowRight className="text-red-600" />
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
