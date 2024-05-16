import { getEmployeeByIdAction } from "@/actions/employee"
import getCurrentUser from "@/actions/getCurrentUser"
import { getPontosAction, registerPontoAction } from "@/actions/ponto"
import { Button } from "@/components/ui/button"
import { formatDate, formatDateK, formatTime } from "@/lib/utils"
import { UserPayload } from "@/lib/validations/auth"
import { redirect } from "next/navigation"
import { LogOutButton } from "./_components/logout-button"
import { RegisterButton } from "./_components/register-button"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { SiteFooter } from "@/components/layouts/site-footer"
import { MeusPontoButton } from "./_components/meus-ponto-button"

interface EmployeeResponse {}
export default async function RegistrarPage() {
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
    <div className="flex flex-col items-center justify-start bg-muted min-h-screen">
      <div className="bg-primary dark:bg-background w-full p-4 text-white flex justify-between">
        <Link
          aria-label="Home"
          href="/"
          className="hidden items-center space-x-2 lg:flex"
        >
          <Icons.logo className="h-6 w-6  dark:text-white" aria-hidden="true" />
          <span className="hidden font-bold lg:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <h1 className="text-xl font-bold text-center">Meu Ponto</h1>

        <LogOutButton />
      </div>
      <div className="flex-1 max-w-4xl px-5  md:w-full  container">
        <div className="bg-primary dark:bg-background w-full rounded-md  p-1 mt-2 mb-4">
          <div className="bg-white dark:bg-muted p-">
            <p className="text-center text-foreground">Último ponto</p>
            <p className="text-center font-bold text-foreground">
              {pontos && pontos.length > 0 && formatDateK(pontos[0]?.dia)}
            </p>
          </div>
        </div>

        {pontos &&
          pontos.length > 0 &&
          pontos.map(
            (ponto, i) =>
              (ponto.Entrada || ponto.Saida) && (
                <div
                  key={i}
                  className="bg-background w-full p-4 mt-2 rounded-md"
                >
                  <div className="flex justify-between">
                    <div className="w-1/2 p-2 border-r border-primary dark:border-foreground">
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
      </div>

      <div className="flex flex-col max-w-4xl w-full justify-center items-center px-4">
        <RegisterButton email={user?.email} />
        <MeusPontoButton />
      </div>

      <SiteFooter />
    </div>
  )
}
