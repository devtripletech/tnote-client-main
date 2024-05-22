"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function GoBackButton() {
  const router = useRouter()
  return (
    <Button
      variant="ghost"
      className="text-white"
      onClick={() => router.back()}
    >
      <ArrowLeft />
    </Button>
  )
}
