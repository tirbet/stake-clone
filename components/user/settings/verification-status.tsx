import { formatLocalDate, formatVerificationDate, getLocalRelativeTime, smartDateFormat } from "@/utils/date-utils";
import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"

interface VerificationStatusProps {
  label: string;
  isVerified: boolean
  verifiedAt: string | null
  className?: string
}
type LocaleCode = "en" | "bn" | "hi"
export function VerificationStatus({
  label,
  isVerified,
  verifiedAt,
  className
}: VerificationStatusProps) {


  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {isVerified && (
        <>
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-sm text-muted-foreground">
            {label} {getLocalRelativeTime(verifiedAt)}
          </span>
        </>
      )}
    </div>
  )
}