"use client"

import { ColumnDef } from "@tanstack/react-table"

import { statuses } from "../data/data"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { formatDateK } from "@/lib/utils"
import { Project } from "@/lib/validations/project"

export const columns: ColumnDef<Project>[] = [
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
    accessorKey: "Status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("Status")
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
    accessorKey: "Inicio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Início" />
    ),
    cell: ({ cell }) => formatDateK(cell.getValue() as Date),
    enableColumnFilter: false,
  },
  {
    accessorKey: "Termino",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Término" />
    ),
    cell: ({ cell }) => formatDateK(cell.getValue() as Date),
    enableColumnFilter: false,
  },
  {
    accessorKey: "GerenteTecnico",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gerente Técnico" />
    ),
    cell: ({ row }) => (
      <div className="flex">
        <span className="max-w-[250px] truncate">
          {row.getValue("GerenteTecnico")}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions projectId={Number(row.original.ID_projeto)} />
    ),
  },
]
