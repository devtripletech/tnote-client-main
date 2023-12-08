"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import {
  EmployeeReport,
  ProjectExpenseReport,
} from "@/lib/validations/employee"
import { Badge } from "@/components/ui/badge"
import { cn, formatDateBr, formatDateK, getTime } from "@/lib/utils"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<ProjectExpenseReport>[] = [
  {
    accessorKey: "dia",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DATA" />
    ),
    cell: ({ row }) => {
      const dayOfWeek = formatDateBr(row.getValue("dia")).getDay()

      return (
        <div className="flex">
          <span
            className={cn("max-w-[250px] truncate", {
              "text-destructive": dayOfWeek === 0 || dayOfWeek === 6,
            })}
          >
            {formatDateK(row.getValue("dia"))}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Nome_projeto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NOME PROJETO" />
    ),
    cell: ({ row }) => {
      return <div className="">{row.getValue("Nome_projeto")}</div>
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Descricao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DESCRIÇÃO" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-1 items-center">
          {row.getValue("Descricao")}
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "km",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KM" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">{row.getValue("km")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Refeicao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="REF" />
    ),
    cell: ({ row }) => {
      return <div className="flex items-center">{row.getValue("Refeicao")}</div>
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "estacionamento",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ESTA" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {row.getValue("estacionamento")}
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Outros",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="OUT" />
    ),
    cell: ({ row }) => {
      return <div className="flex items-center">{row.getValue("Outros")}</div>
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "HoraInicio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="INICIO" />
    ),
    cell: ({ row }) => {
      return <div className="">{getTime(row.getValue("HoraInicio"))}</div>
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "HoraFim",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="FIM" />
    ),
    cell: ({ row }) => {
      return <div className="">{getTime(row.getValue("HoraFim"))}</div>
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "TOTAL_TRABALHADO1",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TOTAL" />
    ),
    cell: ({ row }) => (
      <div className="flex">
        <span className="max-w-[250px] truncate">
          {row.getValue("TOTAL_TRABALHADO1")}
        </span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions attendanceId={row.original.id_lancamento} />
    ),
  },
]
