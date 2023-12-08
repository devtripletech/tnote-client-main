"use client"

import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { ColumnDef, Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { statuses } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Icons } from "@/components/icons"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import React from "react"
import { z } from "zod"
import {
  ProjectExpenseReport,
  requestProjectExpenseSchema,
} from "@/lib/validations/employee"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { catchError, cn, formatToSting } from "@/lib/utils"
import { listProjectExpenseReportAction } from "@/actions/report"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"
import { CalendarIcon, Search } from "lucide-react"

interface DataTableToolbarProps<TData> {
  userId: string
  setProjectExpenseReport: React.Dispatch<React.SetStateAction<TData[]>>
}
type Inputs = z.infer<typeof requestProjectExpenseSchema>

export function DataTableToolbar<TData>({
  userId,
  setProjectExpenseReport,
}: DataTableToolbarProps<TData>) {
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(requestProjectExpenseSchema),
    defaultValues: {
      userId: userId,
      date_start_end: {
        from: new Date(),
        // to: addDays(new Date(2022, 0, 20), 20),
      },
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const res = await listProjectExpenseReportAction(data)
        setProjectExpenseReport(res)
        // toast.success(res.status)
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2 p-1">
        <Form {...form}>
          <form
            className="flex gap-2 justify-center items-center"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="date_start_end"
              render={({ field }: any) => {
                return (
                  <FormItem className="w-60">
                    {/* <FormLabel>Data início e término</FormLabel> */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, "LLL dd, y", {
                                  locale: ptBR,
                                })}{" "}
                                -{" "}
                                {format(field.value.to, "LLL dd, y", {
                                  locale: ptBR,
                                })}
                              </>
                            ) : (
                              format(field.value.from, "LLL dd, y", {
                                locale: ptBR,
                              })
                            )
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field?.value.from}
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={2}
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <Button
              variant="destructive"
              className=""
              disabled={
                isPending || form.getValues("date_start_end").to === undefined
              }
            >
              {isPending ? (
                <Icons.spinner
                  className="h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Search className=" h-4 w-4" />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
