"use client"

import { ColumnDef } from "@tanstack/react-table"
import { statuses } from "../data/data"
import { Client } from "@/lib/validations/client"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Employee } from "@/lib/validations/employee"

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "Nome",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue("Nome")}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "inativo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) =>
          status.value === (row.getValue("inativo") ? "inativo" : "ativo")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex space-x-1 items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "ID_Cargo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cargo" />
    ),
    cell: ({ row }) => (
      <div className="flex">
        <span className="max-w-[250px] truncate">
          {row.getValue("ID_Cargo")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "gerente",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gerente Técnico" />
    ),
    cell: ({ row }) => (
      <div className="flex">
        <span className="max-w-[250px] truncate">
          {row.getValue("gerente")}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions employeeId={row.original.ID_funcionario} />
    ),
  },
]
