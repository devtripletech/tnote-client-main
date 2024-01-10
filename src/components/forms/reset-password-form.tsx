"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import type { z } from "zod"

import { catchError, cn } from "@/lib/utils"
import { authSchema, checkEmailSchema } from "@/lib/validations/auth"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password-input"
import { useState } from "react"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { useMounted } from "@/hooks/use-mounted"
import { Skeleton } from "../ui/skeleton"
import { verifyEmailAction } from "@/actions/user"

type Inputs = z.infer<typeof checkEmailSchema>

export function ResetPasswordForm() {
  const mounted = useMounted()
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [isLoading, setIsLoading] = useState(false)

  /*
 async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const res = await verifyEmailAction(data)
        console.log(res)
        toast.success(res?.status)
        //form.reset()
        // router.push("/dashboard/client")
      } catch (err) {
        catchError("não foi possível enviar email")
      }
    })
    // router.push("/reset-password/step2")
  }
  */

  async function onSubmit(data : Inputs){
    
    try{
      const res = await verifyEmailAction(data)

      toast.success(res?.status)

    }catch(error){
      catchError("não foi possível enviar email")
    }
   


  }

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  return (
    <>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Redefinir senha</CardTitle>
          <CardDescription>
            Digite seu endereço de e-mail e lhe enviaremos um link
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form
              className="grid gap-4"
              onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {mounted ? (
                <Button disabled={isLoading} type="submit">
                  {isLoading && (
                    <Icons.spinner
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Continue
                  <span className="sr-only">Entrar</span>
                </Button>
              ) : (
                <Skeleton
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "w-full bg-muted text-muted-foreground"
                  )}
                >
                  Continue
                </Skeleton>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2"></CardFooter>
      </Card>
    </>
  )
}
