import type { Metadata } from "next"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
import { LogOutButtons } from "@/components/auth/logout-buttons"
import { Toaster } from "sonner"
import { ResetPasswordForm } from "@/components/forms/reset-password-form"
import { ResetPasswordFormStep2 } from "@/components/forms/reset-password-form-step2"

export const metadata: Metadata = {
  title: "Recover Password",
  description: "Recover Password",
}

export default function ResetPasswordStep2Page() {
  return (
    <Shell className="max-w-lg">
      <ResetPasswordFormStep2 />
    </Shell>
  )
}
