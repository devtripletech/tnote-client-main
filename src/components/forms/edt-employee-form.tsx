"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Toaster, toast } from "sonner"
import { z } from "zod"
import { catchError, cn, formatDateK } from "@/lib/utils"
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
import { projectSchema } from "@/lib/validations/project"
import { addProjectAction } from "@/actions/project"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { EmployeeSelect } from "../selects/employees-select"
import {
  Employee,
  EmployeeCity,
  EmployeeHours,
  EmployeePosition,
  TechnicalManager,
  employeeSchema,
} from "@/lib/validations/employee"
import { ClientsSelect } from "../selects/clients-select"
import { EmployeeHoursSelect } from "../selects/employee-hours-select"
import { EmployeeCitySelect } from "../selects/employee-city-select"
import { EmployeePositionSelect } from "../selects/employee-position-select"
import { editEmployeeAction } from "@/actions/employee"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

type Inputs = z.infer<typeof employeeSchema>

interface EditEmployeeFormProps {
  employees: TechnicalManager[]
  clients: Client[]
  employee: Employee
  employeeHours: EmployeeHours[]
  employeeCity: EmployeeCity[]
  employeePosition: EmployeePosition[]
}
export function EditEmployeeForm({
  employee,
  employees,
  clients,
  employeeHours,
  employeeCity,
  employeePosition,
}: EditEmployeeFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      ID_funcionario: employee.ID_funcionario ?? "",
      Nome: employee.Nome ?? "",
      ID_cliente: employee.ID_cliente ?? 0,
      ID_horario: employee.ID_horario ?? 0,
      Codigo_cidade: employee.Codigo_cidade ?? 0,
      ID_Cargo: employee.ID_Cargo ?? "",
      gerente: employee.gerente ?? 0,
      flexivel: employee.flexivel ?? false,
      horario_12_36: employee.horario_12_36 ?? false,
      adm: employee.adm ?? false,
      inativo: employee.inativo ?? false,
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const res = await editEmployeeAction(data)

        toast.success(res.status)

        form.reset()

        router.push("/dashboard/employee")
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
          name="ID_funcionario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Funcionário</FormLabel>
              <Input {...field} />
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
          name="ID_cliente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <ClientsSelect
                field={field}
                clients={clients}
                form={form}
                name="ID_cliente"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ID_horario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário</FormLabel>
              <EmployeeHoursSelect
                field={field}
                form={form}
                name="ID_horario"
                data={employeeHours}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Codigo_cidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <EmployeeCitySelect
                field={field}
                form={form}
                name="Codigo_cidade"
                data={employeeCity}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ID_Cargo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo</FormLabel>
              <EmployeePositionSelect
                field={field}
                form={form}
                name="ID_Cargo"
                data={employeePosition}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contrato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contrato</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de contrato" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CLT">CLT</SelectItem>
                  <SelectItem value="PJ">PJ</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gerente"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gerente</FormLabel>
              <EmployeeSelect
                field={field}
                employees={employees}
                form={form}
                name="gerente"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flexivel"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-4 items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">flexível</FormLabel>
                <FormDescription>
                  Este índice indica se o horário de trabalho do funcionário é
                  flexível ou não. Se o valor tiver checado, isso significa que
                  o horário de trabalho é adaptável e pode ser ajustado conforme
                  necessário. Se for não tiver checado, o horário provavelmente
                  é fixo e segue um padrão definido.
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

        <FormField
          control={form.control}
          name="horario_12_36"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-4 items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">horário 12 36</FormLabel>
                <FormDescription>
                  Esse índice determina se o horário de trabalho do funcionário
                  segue um ciclo de 12 ou 36 horas. Se o valor for (12 horas),
                  significa que o funcionário trabalha em um ciclo de 12 horas,
                  seja em um turno diurno ou noturno. Se for (36 horas), indica
                  um ciclo de trabalho alternativo, possivelmente em escala de
                  plantão ou período estendido, seguido por um tempo maior de
                  descanso.
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

        <FormField
          control={form.control}
          name="adm"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-4 items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Admin</FormLabel>
                <FormDescription>
                  Este índice identifica se o funcionário possui privilégios
                  administrativos ou de supervisão. Se o valor for checado, o
                  funcionário tem permissões de administração, podendo realizar
                  tarefas e tomar decisões de gerenciamento. Se não for checado,
                  o funcionário provavelmente desempenha funções sem autoridade
                  administrativa direta.
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

        <FormField
          control={form.control}
          name="inativo"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-4 items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Status</FormLabel>
                <FormDescription>
                  Esse índice indica se o funcionário está atualmente ativo ou
                  inativo na empresa. Se o valor não for checado, significa que
                  o funcionário está atualmente empregado e desempenhando suas
                  funções. Se for for checado, indica que o funcionário não está
                  mais ativo na empresa, possivelmente devido a saída, licença
                  ou qualquer outra condição que o afaste do trabalho ativo.
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
