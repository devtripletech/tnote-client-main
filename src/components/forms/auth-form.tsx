"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import type { z } from "zod"

import { cn } from "@/lib/utils"
import { authSchema } from "@/lib/validations/auth"
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
import { useCallback, useEffect, useState } from "react"
import { SignInResponse, signIn, useSession } from "next-auth/react"
import { Toaster, toast } from "sonner"
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

type Inputs = z.infer<typeof authSchema>

export function AuthForm() {
  // const session = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const mounted = useMounted()
  const callbackUrl = searchParams && searchParams.get("callbackUrl")
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!")
        } else {
          router.push(decodeURIComponent(callbackUrl ?? "/registrar"))
        }
      })
      .finally(() => setIsLoading(false))
  }

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Entrar</CardTitle>
          {/* <CardDescription>Choose your preferred sign in method</CardDescription> */}
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="**********" {...field} />
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
                  Entrar
                  <span className="sr-only">Entrar</span>
                </Button>
              ) : (
                <Skeleton
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "w-full bg-muted text-muted-foreground"
                  )}
                >
                  Entrar
                </Skeleton>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <Link
            aria-label="Redefinir senha"
            href="/reset-password"
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            Redefinir senha
          </Link>
        </CardFooter>
      </Card>
    </>
  )
}
