import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'kelwin & isabela',
  description: 'Memorial de memórias e momentos especiais de Kelwin & Isabela',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
