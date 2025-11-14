'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { authAPI } from '@/lib/api';
import Link from 'next/link';
import { Spotlight } from '@/components/ui/spotlight';
import { BackgroundBeams } from '@/components/ui/background-beams';

interface SignupForm {
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
}

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>({
    defaultValues: {
      role: 'USER',
    },
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await authAPI.signup(data.email, data.name, data.password, data.role);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Signup error:', err);
      const errorMessage = err.response?.data?.error 
        || err.message 
        || 'Signup failed. Please check your connection and try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <BackgroundBeams className="opacity-85" />
      <Spotlight className="opacity-65 mix-blend-screen" size={740} strength={0.35} />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-neutral-900/80 p-10 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div>
            <h2 className="mt-2 text-center text-3xl font-semibold tracking-tight">
              Create your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-200">
                  Full Name
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  className="mt-1 block w-full rounded-lg border border-white/10 bg-neutral-900/60 px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-300">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-200">
                  Email address
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  className="mt-1 block w-full rounded-lg border border-white/10 bg-neutral-900/60 px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-200">
                  Password
                </label>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  type="password"
                  className="mt-1 block w-full rounded-lg border border-white/10 bg-neutral-900/60 px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-300">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-neutral-200">
                  Role
                </label>
                <select
                  {...register('role', { required: 'Role is required' })}
                  className="mt-1 block w-full rounded-lg border border-white/10 bg-neutral-900/60 px-3 py-2 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-300">{errors.role.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300/60 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? 'Signing up...' : 'Sign up'}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-neutral-300">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-white hover:text-neutral-200">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

