"use client"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
export function ButtonAction() {
  const router = useRouter()
  const [isPending, setPending] = useState(false)

  function handleClick() {
    setPending(true)
    router.push(`/dashboard/project/new`)
  }

  return (
    <Button
      className="w-fit"
      size={"sm"}
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending && (
        <Icons.spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}
      Adicionar novo projeto
    </Button>
  )
}
