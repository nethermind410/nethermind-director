import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nethermind Director',
  description: 'AI-powered content director for your channel',
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
