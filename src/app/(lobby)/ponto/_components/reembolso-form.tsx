"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Toaster, toast } from "sonner"
import type { z } from "zod"
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
import { refundSchema } from "@/lib/validations/reembolso"
import { registerReembolsoAction } from "@/actions/ponto"

type Inputs = z.infer<typeof refundSchema>

interface ReembolsoFormProps {
  id: string | number
  email: string
}

export default function ReembolsoForm({ id, email }: ReembolsoFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(refundSchema),
    defaultValues: {
      estacionamento: 0,
      id_ponto: Number(id),
      outros: 0,
      refeicao: 0,
      km: 0,
      comentario: "",
    },
  })

  function onSubmit(input: Inputs) {
    startTransition(async () => {
      try {
        const res = await registerReembolsoAction({ email, input })

        if (res.error) {
          toast.error("Ocorreu um erro")
        } else {
          toast.success(
            res?.mensagem ?? "Registro de reembolso enviado com sucesso!"
          )
          form.reset()
          router.push("/ponto")
        }
      } catch (err) {
        toast.error("Ocorreu um erro")
      }
    })
  }
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5 py-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="estacionamento"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Estacionamento</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="refeicao"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Refeição</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="km"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Km</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="outros"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Outros</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="comentario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comentário</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Digite aqui seu comentário."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary dark:bg-background"
          disabled={isPending}
        >
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
