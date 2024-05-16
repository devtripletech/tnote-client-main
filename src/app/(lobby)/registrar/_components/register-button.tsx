"use client"
import { registerPontoAction } from "@/actions/ponto"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"
import { toast } from "sonner"

interface RegisterButtonProps {
  email: string
}
export function RegisterButton({ email }: RegisterButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleButtonRegister() {
    setLoading(true)
    try {
      const data = await registerPontoAction(email)
      console.log(data)
      if (data && data?.error) {
        toast.error(data.error)
      } else {
        toast.success(data?.mensagem)
      }

      router.push("/registrar")
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <Button
      onClick={handleButtonRegister}
      className="bg-primary px-4 w-full mt-4 text-white dark:bg-background dark:hover:dark:bg-background/80"
      disabled={loading}
    >
      {loading && (
        <Icons.spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}
      Marcar ponto
    </Button>
  )
}
