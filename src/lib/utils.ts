import { type ClassValue, clsx } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import { z } from "zod"
import "dayjs/locale/pt-br"
import dayjs from "dayjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return toast.error(errors.join("\n"))
  } else if (err instanceof Error) {
    return toast.error(err.message)
  } else {
    return toast.error("Algo deu errado. Tente novamente mais tarde.")
  }
}

export function generateDatesFromMonthBeginning(ano: string, mes: string) {
  let year = ano
  let month = mes

  if (!year && !month) {
    year = new Date().getFullYear().toString()
    month = (new Date().getMonth() + 1).toString()
  }

  const firstDayOfTheMonth = dayjs(`${ano}-${mes}`, {
    format: "YYYY-MM",
  }).startOf("month")
  const lastDayOfTheMonth = dayjs(`${ano}-${mes}`, { format: "YYYY-MM" }).endOf(
    "month"
  )

  const today = new Date()

  const dates = []
  let compareDate = firstDayOfTheMonth

  while (compareDate.isBefore(lastDayOfTheMonth)) {
    dates.push(compareDate.toDate())
    compareDate = compareDate.add(1, "day")
  }

  return dates
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT"
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
) {
  const { currency = "USD", notation = "compact" } = options

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
  }).format(Number(price))
}

export function formatNumber(
  number: number | string,
  options: {
    decimals?: number
    style?: Intl.NumberFormatOptions["style"]
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
) {
  const { decimals = 0, style = "decimal", notation = "standard" } = options

  return new Intl.NumberFormat("en-US", {
    style,
    notation,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(number))
}
export function formatTime(date: Date | string | number) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date))
}

export function formatDate(date: Date | string | number) {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}
export function formatDateK(date: Date | string | number) {
  const dataNoFusoHorarioBR = new Date(date)
  dataNoFusoHorarioBR.setHours(dataNoFusoHorarioBR.getHours() + 3)
  const opcoesFormato = { timeZone: "America/Sao_Paulo" }
  const formatoDataBR = new Intl.DateTimeFormat("pt-BR", opcoesFormato)

  return formatoDataBR.format(dataNoFusoHorarioBR)
}

export function formatDateW(dataString: Date | string | number) {
  const data = new Date(dataString)

  return (
    data.getUTCHours().toString().padStart(2, "0") +
    ":" +
    data.getUTCMinutes().toString().padStart(2, "0")
  )
}

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: "accurate" | "normal" = "normal"
) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`
}

export function formatId(id: number) {
  return `#${id.toString().padStart(4, "0")}`
}

export function validarMinutos(input: string) {
  const minutosPermitidos = ["00", "15", "30", "45"]
  const valor = input.split(":")[1]

  if (!minutosPermitidos.includes(valor)) {
    return false
  }

  return true
}
export function getTime(dataString: Date | string | number) {
  const data = new Date(dataString)

  return (
    data.getUTCHours().toString().padStart(2, "0") +
    ":" +
    data.getUTCMinutes().toString().padStart(2, "0")
  )
}

export function getFirstLetterDayOfWeek(dataString: Date | string | number) {
  const data = new Date(dataString)
  const diasDaSemana = ["D", "S", "T", "Q", "Q", "S", "S"]
  return diasDaSemana[data.getDay()]
}

export function formatDateBr(dataString: Date | string | number) {
  const date = new Date(dataString)
  date.setHours(date.getHours() + 3)

  return date
}

export function formatToSting(dataString: Date | string | number) {
  const data = new Date(dataString)
  // Obtenha os componentes da data
  var ano = data.getFullYear()
  var mes = (data.getMonth() + 1).toString().padStart(2, "0")
  var dia = data.getDate().toString().padStart(2, "0")

  // Concatene os componentes em uma string no formato desejado
  var dataFormatada = ano + mes + dia

  return dataFormatada
}

export function checkPermissionForEmployee(role: number) {
  if (role !== 1 && role !== 5 && role !== 2 && role !== 3 && role !== 4) {
    return true
  }
  return false
}
export function checkPermissionForAdministrative(role: number) {
  if (role !== 2 && role !== 3 && role !== 4) {
    return true
  }
  return false
}
export function checkPermissionForSales(role: number) {
  if (role !== 5 && role !== 3 && role !== 4) {
    return true
  }
  return false
}
