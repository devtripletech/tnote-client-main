import { getEmployeeByIdAction } from "@/actions/employee"
import getCurrentUser from "@/actions/getCurrentUser"
import { getPontosAction, registerPontoAction } from "@/actions/ponto"
import { Button } from "@/components/ui/button"
import { formatDate, formatTime } from "@/lib/utils"
import { UserPayload } from "@/lib/validations/auth"
import { redirect } from "next/navigation"
import { LogOutButtons } from "./_components/logout-button"
import { RegisterButton } from "./_components/register-button"

interface EmployeeResponse {}
export default async function PontoPage() {
  const user = (await getCurrentUser()) as UserPayload

  if (!user) {
    redirect("/")
  }

  const employee = await getEmployeeByIdAction(user.email)

  if (employee?.flexivel) {
    redirect("/dashboard/attendance")
  }
  const pontos = await getPontosAction(user.email)

  return (
    <div className="flex flex-col items-center justify-start bg-[#F2F2F2] h-full">
      <div className="bg-primary w-full p-4 text-white flex justify-between">
        <div className="w-4"></div>
        <h1 className="text-xl font-bold text-center">Meu Ponto</h1>

        <LogOutButtons />
      </div>
      <div className="bg-primary w-full p-4 mt-2">
        <div className="bg-white p-2">
          <p className="text-center">Último ponto</p>
          <p className="text-center font-bold">
            {pontos.length > 0 && formatDate(pontos[0]?.dia)}
          </p>
        </div>
      </div>

      {pontos &&
        pontos.length > 0 &&
        pontos.map(
          (ponto, i) =>
            (ponto.Entrada || ponto.Saida) && (
              <div key={i} className="bg-white w-full p-4 mt-2">
                <div className="flex justify-between">
                  <div className="w-1/2 p-2 border-r border-primary">
                    <p className="text-center">Entrada</p>
                    <p className="text-center font-bold">
                      {ponto.Entrada ? formatTime(ponto.Entrada) : "--:--"}
                    </p>
                  </div>
                  <div className="w-1/2 p-2">
                    <p className="text-center">Saída</p>
                    <p className="text-center font-bold">
                      {ponto.Saida ? formatTime(ponto.Saida) : "--:--"}
                    </p>
                  </div>
                </div>
              </div>
            )
        )}

      <RegisterButton email={user?.email} />
      <Button className="bg-white w-5/6 mt-2 text-primary border-2 border-primary hover:text-white mb-4">
        Meus Pontos
      </Button>
    </div>
  )
}
