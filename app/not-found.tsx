import Link from 'next/link'
 
export default function NotFound() {
  return (
     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 text-white px-6">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold tracking-tight text-slate-200">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold">
          Page not found
        </h2>

        <p className="mt-3 text-slate-400">
          The page you’re looking for doesn’t exist or wandered off into the void.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 rounded-xl bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur hover:bg-white/20 transition"
        >
          ← Return home
        </Link>
      </div>
    </div>
  )
}