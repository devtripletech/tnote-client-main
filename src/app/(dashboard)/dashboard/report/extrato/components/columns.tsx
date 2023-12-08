"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { EmployeeReport } from "@/lib/validations/employee"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<EmployeeReport>[] = [
  {
    accessorKey: "Extrato",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Extrato" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("Extrato")
      const isDebito = value === "Débito" ? true : false
      const isCredito = value === "Crédito" ? true : false

      type bgProps = "destructive" | "default" | "secondary"
      let bg: bgProps = "secondary"

      if (isDebito) {
        bg = "destructive"
      }
      if (isCredito) {
        bg = "default"
      }

      return (
        <div className="flex space-x-2">
          <Badge variant={bg}>{row.getValue("Extrato")}</Badge>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "inicio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Início" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-1 items-center">
          {row.getValue("inicio")}
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fim",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fim" />
    ),
    cell: ({ row }) => (
      <div className="flex">
        <span className="max-w-[250px] truncate">{row.getValue("fim")}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Saldo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Saldo" />
    ),
    cell: ({ row }) => (
      <div className="flex">
        <span className="max-w-[250px] truncate">{row.getValue("Saldo")}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
]
