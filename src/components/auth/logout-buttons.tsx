"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"
import { Button, buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"
import { signOut, useSession } from "next-auth/react"
import { useEffect } from "react"

export function LogOutButtons() {
  const router = useRouter()
  const session = useSession()
  const mounted = useMounted()
  const [isPending, startTransition] = React.useTransition()

  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/")
    }
  }, [session?.status, router])
  return (
    <div className="flex w-full items-center space-x-2">
      {mounted ? (
        <Button
          aria-label="Sair"
          size="sm"
          className="w-full"
          disabled={isPending}
          onClick={() => signOut()}
        >
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sair
        </Button>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: "sm" }),
            "w-full bg-muted text-muted-foreground"
          )}
        >
          Sair
        </Skeleton>
      )}
      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => router.back()}
        disabled={isPending}
      >
        Voltar
      </Button>
    </div>
  )
}
