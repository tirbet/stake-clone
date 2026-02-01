export default function Loading() {
  // Or a custom loading skeleton component
  return (
     <div className="flex h-screen items-center justify-center">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary border-r-purple-500" />
        <div className="absolute inset-2 rounded-full bg-background" />
      </div>
    </div>
  )
}