import { headers } from "next/headers"
import Script from "next/script"
import { Shell } from "@/components/shells/shell"
import { AuthForm } from "@/components/forms/auth-form"
import { Toaster } from "sonner"

const AuthPage = () => {
  const nonce = headers().get("x-nonce")
  if (!nonce) return
  return (
    <Shell className="max-w-lg">
      <AuthForm />
      <Toaster />
      <Script
        src="https://www.googletagmanager.com/gtag/js"
        strategy="afterInteractive"
        nonce={nonce}
      />
    </Shell>
  )
}

export default AuthPage
