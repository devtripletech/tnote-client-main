import { z } from "zod"

export const requestProjectExpenseSchema = z.object({
  userId: z.string(),
  date_start_end: z.object({
    from: z.coerce.date({ required_error: "Selecione a data de inicio" }),
    to: z.coerce.date({ required_error: "Selecione a data de termino" }),
  }),
})

export const projectExpenseReportSchema = z.object({
  id_lancamento: z.number(),
  Nome_projeto: z.string(),
  Descricao: z.string(),
  dia: z.string(),
  km: z.number(),
  Refeicao: z.number(),
  estacionamento: z.number(),
  Outros: z.number(),
  HoraInicio: z.string(),
  HoraFim: z.string(),
  TOTAL_TRABALHO_FUNC: z.string(),
})
export const employeeReportSchema = z.object({
  TOTAL: z.string(),
  NOME: z.string(),
  Saldo: z.string(),
  Extrato: z.string(),
  ID_Periodo: z.number(),
  ID_funcionario: z.string(),
  inicio: z.string(),
  fim: z.string(),
})

export const employeeHoursSchema = z.object({
  ID_horario: z.number(),
  Nome: z.string(),
})
export const employeeCitySchema = z.object({
  Codigo_Cidade: z.number(),
  Cidade: z.string(),
})

export const employeePositionSchema = z.object({
  ID_Cargo: z.string(),
})
export const technicalManagerSchema = z.object({
  gerenteTecnico: z.string(),
  Nome: z.string(),
})

export const employeeSchema = z.object({
  ID_funcionario: z.string(),
  Nome: z.string(),
  flexivel: z.boolean().optional(),
  inativo: z.boolean().optional(),
  ID_horario: z.number(),
  ID_empresa: z.number().optional(),
  gerente: z.string(),
  ID_cliente: z.number().optional(),
  ID_Cargo: z.string(),
  socio: z.boolean().optional(),
  contrato: z.string().optional(),
  Cidade_Atua: z.number().optional(),
  Codigo_cidade: z.number(),
  nivel: z.string().optional(),
  ID_projeto: z.number().optional(),
  horario_12_36: z.boolean().optional(),
  subnivel: z.string().optional(),
  Salario: z.number().optional(),
  adm: z.boolean().optional(),
  corte_lancamentos: z.number().optional(),
  permite_corte: z.number().optional(),
})

export type Employee = z.infer<typeof employeeSchema>

export type TechnicalManager = z.infer<typeof technicalManagerSchema>

export type EmployeeHours = z.infer<typeof employeeHoursSchema>

export type EmployeeCity = z.infer<typeof employeeCitySchema>

export type EmployeePosition = z.infer<typeof employeePositionSchema>

export type EmployeeReport = z.infer<typeof employeeReportSchema>

export type ProjectExpenseReport = z.infer<typeof projectExpenseReportSchema>
