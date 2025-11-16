import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Agent OS Web',
  description: 'Personal OS for PoulCore',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Top Navigation */}
        <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
          <nav className="max-w-6xl mx-auto flex items-center gap-6 h-14 px-4">
            <Link href="/" className="font-semibold text-lg">
              Agent OS
            </Link>
            <Link href="/blog" className="text-sm text-gray-600 hover:text-black">Blog</Link>
            <Link href="/chat" className="text-sm text-gray-600 hover:text-black">Chat</Link>
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-black">Dashboard</Link>
          </nav>
        </header>

        {/* Page Content */}
        <main className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}
