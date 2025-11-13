import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Role-Based Auth App',
  description: 'Full-stack application with role-based authentication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


