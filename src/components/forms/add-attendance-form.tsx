"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Toaster, toast } from "sonner"
import type { z } from "zod"
import { ptBR } from "date-fns/locale"

import { catchError, cn, validarMinutos } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

import { addAttendanceSchema } from "@/lib/validations/attendance"
import { addAttendanceAction } from "@/actions/attendance"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { ClientsSelect } from "../selects/clients-select"
import { ProjectsSelect } from "../selects/projects-select"
import { Project } from "@/lib/validations/project"
import { Client } from "@/lib/validations/client"
import { getClientsAction } from "@/actions/client"

interface AddAttendanceFormProps {
  user: any
  projects: Project[]
  token: string
}

type Inputs = z.infer<typeof addAttendanceSchema>

export function AddAttendanceForm({
  user,
  projects,
  token,
}: AddAttendanceFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [clientId, setClientId] = React.useState()
  const [clients, setClients] = React.useState<Client[]>()
  const [projectFiltered, setProjectFiltered] = React.useState<Project[]>()

  async function onLoadingClient() {
    try {
      const data = await getClientsAction()
      setClients(data)
    } catch (error) {
      catchError(error)
    }
  }

  async function onLoadingProjects() {
    try {
      const filtered = projects.filter(
        (item) => item.ID_Cliente === Number(clientId)
      ) as unknown as Project[]
      setProjectFiltered(filtered)
    } catch (error) {
      catchError(error)
    }
  }

  React.useEffect(() => {
    onLoadingClient()

    if (clientId) {
      onLoadingProjects()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId])

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(addAttendanceSchema),
    defaultValues: {
      ID_funcionario: user?.email,
      hoursSelectStart: "",
      hoursSelectEnd: "",
      KM: 0,
      Refeicao: 0,
      Estacionamento: 0,
      Outros: 0,
      curso: 0,
      alimentacaocliente: 0,
      conducoes: 0

    },
  })

  function onSubmit(data: Inputs) {
    let erro = false
    data.HoraInicioString = `${data.HoraInicio.getFullYear()}-${
      data.HoraInicio.getMonth() + 1
    }-${data.HoraInicio.getDate()}T${data.hoursSelectStart}:00.000Z`

    data.HoraFimString = `${data.HoraFim.getFullYear()}-${
      data.HoraFim.getMonth() + 1
    }-${data.HoraFim.getDate()}T${data.hoursSelectEnd}:00.000Z`

    const inicio = new Date(
      `${data.HoraInicio.getFullYear()}-${
        data.HoraInicio.getMonth() + 1
      }-${data.HoraInicio.getDate()}T${data.hoursSelectStart}:00.000Z`
    ) as Date

    const termino = new Date(
      `${data.HoraFim.getFullYear()}-${
        data.HoraFim.getMonth() + 1
      }-${data.HoraFim.getDate()}T${data.hoursSelectEnd}:00.000Z`
    ) as Date
    const diferencaEmMilissegundos = Math.abs(
      termino.getTime() - inicio.getTime()
    )

    const oitoHorasEmMilissegundos = 8 * 60 * 60 * 1000 // 8 horas em milissegundos
    if (diferencaEmMilissegundos > oitoHorasEmMilissegundos) {
      erro = true
      toast.error("A diferença de horário é maior do que 8 horas.")
    }
    if (inicio > termino) {
      erro = true
      toast.error("A data de início não pode ser maior que a data de término")
    }
    if (!validarMinutos(data.hoursSelectEnd)) {
      erro = true
      toast.error(
        `(${data.hoursSelectEnd}) Apenas 00, 15, 30 ou 45 minutos são permitidos.`
      )
    }

    if (!validarMinutos(data.hoursSelectStart)) {
      erro = true
      toast.error(
        `(${data.hoursSelectStart}) Apenas 00, 15, 30 ou 45 minutos são permitidos.`
      )
    }

    if (!erro) {
      startTransition(async () => {
        try {
          await addAttendanceAction({ ...data, token })
          toast.success("Lançamento adicionado com sucesso!")
          form.reset()
          router.push("/dashboard/attendance")
        } catch (err) {
          catchError(err)
        }
      })
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="ID_cliente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente</FormLabel>
                <ClientsSelect
                  setClientId={setClientId}
                  field={field}
                  form={form}
                  clients={clients ?? []}
                  name="ID_cliente"
                />

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ID_projeto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Projeto</FormLabel>
                <ProjectsSelect
                  projects={projectFiltered ?? []}
                  field={field}
                  form={form}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2">
          <div className="flex gap-2 w-full">
            <FormField
              control={form.control}
              name="HoraInicio"
              render={({ field }: any) => {
                return (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Início</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild className="w-full">
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-between text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Início</span>
                          )}
                          <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
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
              name="hoursSelectStart"
              render={({ field }: any) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Horas</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
          <div className="flex gap-2 w-full">
            <FormField
              control={form.control}
              name="HoraFim"
              render={({ field }: any) => {
                return (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Término</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-between text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Término</span>
                          )}
                          <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
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
              name="hoursSelectEnd"
              render={({ field }: any) => {
                return (
                  <FormItem className="flex flex-col">
                    <FormLabel>Horas</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} step="900" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="Descricao"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Descrição"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="conducoes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conduções</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Conduções" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="alimentacaocliente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alimentação Cliente</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Alimentação Cliente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cursos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cursos</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Cursos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
     
        </div>
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="KM"
            render={({ field }) => (
              <FormItem>
                <FormLabel>KM</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="KM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Estacionamento"
            render={({...field }) => (
              <FormItem>
                <FormLabel>Estacionamento</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Estacionamento"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Outros"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Outros</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Outros" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Refeicao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Refeição</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Refeição" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Adicionar lançamento
          <span className="sr-only">Adicionar lançamento</span>
        </Button>
      </form>
    </Form>
  )
}
