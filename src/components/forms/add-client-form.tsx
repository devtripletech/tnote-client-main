"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Toaster, toast } from "sonner"
import type { z } from "zod"
import { catchError } from "@/lib/utils"

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

type Inputs = z.infer<typeof clientSchema>

export function AddClientForm() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      Nome: "",
      Ativo: true,
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const res = await addClientAction(data)

        toast.success(res.status)

        form.reset()

        router.push("/dashboard/client")
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
          name="Ativo"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-4 items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Status atual do cliente
                </FormLabel>
                <FormDescription>
                  O status do cliente é um índice da situação atual do cliente,
                  ativo ou inativo.
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
