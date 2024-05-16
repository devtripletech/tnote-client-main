import { Card } from "@/components/ui/card"
import { getWeekday } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface PontoDetailsProps {
  date: string
}
export function PontoDetails({ date }: PontoDetailsProps) {
  return (
    <Card className="flex justify-between p-4 items-center">
      <div className="flex flex-col gap-1 text-sm">
        <div className="pb-2">{getWeekday(date)}</div>
        <div>
          <span className="font-medium">Entrada: </span>08:53
        </div>
        <div>
          <span className="font-medium">Saída: </span>18:00
        </div>
        <div className="py-2">
          <span className="font-medium">Intervalo: </span> de 12:00 às 13:12
        </div>

        <div>
          <span className="font-medium">KM: </span> 0
        </div>
        <div>
          <span className="font-medium">Demais despesas:: </span> 0
        </div>
      </div>
      <ArrowRight className="text-red-600" />
    </Card>
  )
}
