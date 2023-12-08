"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Toaster, toast } from "sonner"
import { z } from "zod"
import { catchError, cn, formatDateBr } from "@/lib/utils"
import { ptBR } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

import { Client, clientSchema } from "@/lib/validations/client"

import { Switch } from "../ui/switch"
import { addClientAction, editClientAction } from "@/actions/client"
import { Project, projectSchema } from "@/lib/validations/project"
import { addProjectAction, editProjectAction } from "@/actions/project"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { EmployeeSelect } from "../selects/employees-select"
import { Employee, TechnicalManager } from "@/lib/validations/employee"
import { ClientsSelect } from "../selects/clients-select"

const extendedProjectSchema = projectSchema.extend({
  date_start_end: z.object({
    from: z.coerce.date({ required_error: "Selecione a data de inicio" }),
    to: z.coerce.date({ required_error: "Selecione a data de termino" }),
  }),
  projectStatus: z.boolean().default(false).optional(),
})

type Inputs = z.infer<typeof extendedProjectSchema>

interface EditProjectFormProps {
  employees: TechnicalManager[]
  project: Project
  clients: Client[]
  projectId: number
}
export function EditProjectForm({
  employees,
  project,
  clients,
  projectId,
}: EditProjectFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(extendedProjectSchema),
    defaultValues: {
      ID_projeto: projectId,
      Nome: project?.Nome ?? "",
      ID_Cliente: project?.ID_Cliente ?? "",
      date_start_end: {
        from: project.Inicio ? formatDateBr(project.Inicio) : new Date(),
        to: project.Termino ? formatDateBr(project.Termino) : new Date(),
      },
      projectStatus: project.Status === "Concluído" ? true : false,
      GerenteTecnico: project.GerenteTecnico ?? "",
      Descricao: project.Descricao ?? "",
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        data.Status = data.projectStatus ? "Concluído" : "Em Andamento"
        const res = await editProjectAction(data)

        toast.success(res.status)

        form.reset()

        router.push("/dashboard/project")
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="ID_Cliente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <ClientsSelect
                field={field}
                clients={clients}
                form={form}
                name="ID_Cliente"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_start_end"
          render={({ field }: any) => {
            return (
              <FormItem className="flex flex-col">
                <FormLabel>Data início e término</FormLabel>
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
        <FormField
          control={form.control}
          name="GerenteTecnico"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gerente Técnico</FormLabel>
              <EmployeeSelect
                field={field}
                employees={employees}
                form={form}
                name="GerenteTecnico"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectStatus"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-4 items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Status atual do projeto
                </FormLabel>
                <FormDescription>
                  O status do projeto é um índice da situação atual do projeto,
                  em andamento ou concluído.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Enviar
          <span className="sr-only">Enviar</span>
        </Button>
      </form>
      <Toaster />
    </Form>
  )
}
