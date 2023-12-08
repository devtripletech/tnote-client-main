"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import {
  cn,
  formatDateBr,
  formatDateK,
  formatDateW,
  getFirstLetterDayOfWeek,
} from "@/lib/utils"
import { Attendance } from "@/lib/validations/attendance"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "Dia_Semana",
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ cell, row }) => {
      const dayOfWeek = formatDateBr(row.getValue("HoraInicio")).getDay()

      const firstLetterDayOfWeek = getFirstLetterDayOfWeek(
        row.getValue("HoraInicio")
      )

      const bg = dayOfWeek === 0 || dayOfWeek === 6 ? "destructive" : "outline"
      return (
        <div>
          <Badge
            variant={bg}
            className={cn("text-zinc-900", {
              "text-white": dayOfWeek === 0 || dayOfWeek === 6,
            })}
          >
            {firstLetterDayOfWeek}
          </Badge>
        </div>
      )
    },
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Dia",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dia" />
    ),
    cell: ({ cell, row }) => formatDateK(row.getValue("HoraInicio") as Date),
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "HoraInicio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Início" />
    ),
    cell: ({ cell }) => formatDateW(cell.getValue() as Date),
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "HoraFim",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Término" />
    ),
    cell: ({ cell }) => formatDateW(cell.getValue() as Date),
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nome_projeto",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Projeto" />
    ),
    cell: ({ row }) => (
      <div className="flex">
        <span className="max-w-[250px] truncate">
          {row.getValue("nome_projeto")}
        </span>
      </div>
    ),
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Descricao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descrição" />
    ),
    cell: ({ row }) => (
      <div className="flex">
        <span className="max-w-[250px] truncate">
          {row.getValue("Descricao")}
        </span>
      </div>
    ),
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions attendanceId={Number(row.original.ID_lancamento)} />
    ),
  },
]
