"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function MeusPontoButton() {
  const router = useRouter()
  return (
    <Button
      onClick={() => router.push("/ponto")}
      className="bg-white w-full mt-2 text-primary dark:text-muted border-2 border-primary mb-4 hover:bg-primary/10 dark:border-muted dark:hover:bg-background/10"
    >
      Meus Pontos
    </Button>
  )
}
