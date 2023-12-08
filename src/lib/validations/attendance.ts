import { z } from "zod"

export const addAttendanceSchema = z.object({
  ID_lancamento: z.number().optional(),
  ID_projeto: z.number({
    required_error: "Selecione o projeto",
  }),
  ID_cliente: z.number({
    required_error: "Selecione o projeto",
  }),
  ID_funcionario: z.string(),
  HoraInicio: z.date({
    required_error: "Selecione a data de Início"
  }),
  HoraFim: z.date({
    required_error: "Selecione a data de Término"
  }),
  HoraInicioString: z.string().optional(),
  HoraFimString: z.string().optional(),
  KM: z.coerce.number().optional(),
  Refeicao: z.coerce.number().optional(),
  Estacionamento: z.coerce.number().optional(),
  Outros: z.coerce.number().optional(),
  Ticket: z.string().optional(),
  Descricao: z.string().optional(),
  Dia: z.string().optional(),
  ID_lancamento_sharepoint: z.string().optional(),
  hoursSelectStart: z.string().min(1, {
    message: "Obrigatório.",
  }),
  hoursSelectEnd: z.string().min(1, { message: "Obrigatório." }),

})

export const attendanceSchema = z.object({
  ID_lancamento: z.number().optional(),
  ID_cliente: z.number(),
  ID_projeto: z.number(),
  ID_funcionario: z.string(),
  HoraInicio: z.string(),
  HoraFim: z.string(),
  KM: z.number(),
  Refeicao: z.number(),
  Estacionamento: z.number(),
  Outros: z.number(),
  ID_Cargo: z.string(),
  CargoNivel: z.string(),
  CargoContrato: z.string(),
  ValorHora: z.number().optional(),
  ValorKM: z.number().optional(),
  Ticket: z.string(),
  Descricao: z.string(),
  total_horas: z.number(),
  ID_lancamento_sharepoint: z.string().optional(),
  Dia: z.string(),
  dia_powerapps: z.number(),
  dias_lancamento: z.number(),
  nome_projeto: z.string(),
  Nome_cliente: z.string(),
})

export type Attendance = z.infer<typeof attendanceSchema>
