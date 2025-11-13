'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI, User } from '@/lib/api';
import { BackgroundLines } from '@/components/ui/background-lines';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { Spotlight } from '@/components/ui/spotlight';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await authAPI.getMe();
        setUser(response.user);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900">
        <div className="text-xl text-slate-300">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <BackgroundBeams className="opacity-85" />
      <Spotlight className="opacity-65 mix-blend-screen" size={740} strength={0.35} />
      <BackgroundLines count={65} />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Glass outer dashboard card */}
          <div
            className="
              relative
              rounded-2xl
              p-8
              shadow-2xl
              ring-1 ring-white/6
              bg-[rgba(255,255,255,0.03)]
              backdrop-blur
            "
          >
            {/* Slight ambient glow/inner stroke */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none" aria-hidden="true" />

            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-extrabold text-white">
                Welcome, {user.name} ({user.role})
              </h1>

              {/* Replace with your MovingBorder outline variant if available */}
              {/* Example: <MovingBorderButton onClick={handleLogout} color="red">Logout</MovingBorderButton> */}
              <button
                onClick={handleLogout}
                type="button"
                className="relative rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                Logout
              </button>
            </div>

            <div className="space-y-6">
              {/* Light inner card — use subtle translucent light bg for readability */}
              <div className="bg-[rgba(255,255,255,0.08)] border border-white/8 rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-white/95 mb-4">User Information</h2>
                <div className="space-y-2 text-slate-300">
                  <p>
                    <span className="font-medium text-slate-100">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="font-medium text-slate-100">Role:</span>{' '}
                    <span
                      className={`inline-block px-2 py-1 rounded-md text-sm font-semibold ${
                        user.role === 'ADMIN'
                          ? 'bg-[rgba(167,139,250,0.18)] text-[rgba(167,139,250,1)]'
                          : 'bg-[rgba(96,165,250,0.18)] text-[rgba(96,165,250,1)]'
                      }`}
                    >
                      {user.role}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium text-slate-100">User ID:</span> {user.id}
                  </p>
                </div>
              </div>

              {/* Role-specific card — also light translucent */}
              {user.role === 'ADMIN' && (
                <div className="bg-[rgba(167,139,250,0.06)] border border-[rgba(167,139,250,0.06)] rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-[rgba(255,255,255,0.95)] mb-2">Admin Dashboard</h2>
                  <p className="text-slate-300">
                    You have administrative privileges. Additional admin features can be added here.
                  </p>
                </div>
              )}

              {user.role === 'USER' && (
                <div className="bg-[rgba(96,165,250,0.06)] border border-[rgba(96,165,250,0.06)] rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-[rgba(255,255,255,0.95)] mb-2">User Dashboard</h2>
                  <p className="text-slate-300">
                    Welcome to your user dashboard. You can access user-specific features here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
