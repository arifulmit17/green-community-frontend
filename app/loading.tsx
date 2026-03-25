export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />

        {/* Text */}
        <p className="text-sm text-muted-foreground tracking-wide">
          Loading, please wait…
        </p>
      </div>
    </div>
  )
}
