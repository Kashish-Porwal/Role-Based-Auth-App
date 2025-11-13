import Link from 'next/link'
import { ParticleField } from '@/components/ui/particle-field'
import { MovingBorderOutline } from '@/components/ui/moving-border-outline'

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-95"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(1250px circle at 50% 18%, rgba(255,255,255,0.42), rgba(255,255,255,0.16) 38%, rgba(10,10,10,0.65) 72%, rgba(0,0,0,0.9) 100%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2),transparent_60%,rgba(0,0,0,0.65))]" aria-hidden="true" />
      <ParticleField count={22} />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl rounded-3xl border border-white/5 bg-neutral-950/90 p-12 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
          <h1 className="mb-10 text-4xl font-semibold tracking-tight text-white">Welcome to Auth App</h1>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex"
            >
              <MovingBorderOutline
                innerClassName="bg-blue-600 text-white px-6 py-3 text-sm font-semibold transition hover:brightness-110"
                borderColor="rgba(147, 197, 253, 0.7)"
              >
                Sign Up
              </MovingBorderOutline>
            </Link>
            <Link
              href="/login"
              className="inline-flex"
            >
              <MovingBorderOutline
                innerClassName="bg-green-600 text-white px-6 py-3 text-sm font-semibold transition hover:brightness-110"
                borderColor="rgba(134, 239, 172, 0.7)"
              >
                Login
              </MovingBorderOutline>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

