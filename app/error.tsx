"use client"

import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-7 w-7 text-destructive" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold tracking-tight">
          Something went wrong
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground">
          An unexpected error occurred. Don’t worry — trying again usually fixes it.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <Button onClick={reset}>
            Try again
          </Button>

          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Reload page
          </Button>
        </div>

        {/* Optional debug (dev only) */}
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-6 max-h-40 overflow-auto rounded-md bg-muted p-3 text-left text-xs text-muted-foreground">
            {error.message}
          </pre>
        )}
      </div>
    </div>
  )
}
