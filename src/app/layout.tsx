import {Providers} from '@/app/providers';
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'GPT Games',
    description: 'Play games together (powered by GPT)',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}
