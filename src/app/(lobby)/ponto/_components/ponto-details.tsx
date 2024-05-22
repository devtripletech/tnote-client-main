"use client"
import { ReembolsoResponse } from "@/actions/ponto"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatTime, getWeekday } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface PontoDetailsProps {
  ponto: ReembolsoResponse
}

export function PontoDetails({ ponto }: PontoDetailsProps) {
  const router = useRouter()

  function getIntervalo(entrada: string, saida: string) {
    if (!entrada && !saida) return "--:--"
    return `de ${entrada ? formatTime(entrada) : "--:--"} às ${
      saida ? formatTime(saida) : "--:--"
    }`
  }

  return (
    <Card className="flex justify-between p-4 items-center">
      <div className="flex flex-col gap-1 text-sm">
        <div className="pb-2">{getWeekday(ponto.DIA)}</div>
        <div>
          <span className="font-medium">Entrada: </span>
          {ponto.E_1 ? formatTime(ponto.E_1) : "--:--"}
        </div>
        <div>
          <span className="font-medium">Saída: </span>{" "}
          {ponto.S_3 ? formatTime(ponto.S_3) : "--:--"}
        </div>
        <div className="py-2">
          <span className="font-medium">Intervalo: </span>
          {getIntervalo(ponto.E_2, ponto.S_2)}
        </div>

        <div>
          <span className="font-medium">KM: </span> {ponto.KM}
        </div>
        <div>
          <span className="font-medium">Demais despesas: </span> {ponto.OUTROS}
        </div>
      </div>
      <Button
        variant="ghost"
        onClick={() => router.push(`/ponto/${ponto.PontoID}`)}
      >
        <ArrowRight className="text-red-600" />
      </Button>
    </Card>
  )
}
