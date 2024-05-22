"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import React from "react"

export function RegistrarPontoButton() {
  const router = useRouter()
  return (
    <Button onClick={() => router.replace("/registrar")} variant="outline">
      Registrar ponto
    </Button>
  )
}
