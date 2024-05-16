"use client"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export function LogOutButton() {
  return (
    <Button variant={"ghost"} onClick={() => signOut()}>
      <LogOut />
    </Button>
  )
}
