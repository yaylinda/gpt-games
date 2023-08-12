import NavbarWrapper from '@/app/navbar';
import AuthModal from '@/components/auth/AuthModal';
import { fontSans } from '@/_common/fonts';
import { siteConfig } from '@/_common/constants';
import '@/styles/globals.css';
import clsx from 'clsx';
import moment from 'moment';
import { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    themeColor: [
        {
            media: '(prefers-color-scheme: light)',
            color: 'white',
        },
        {
            media: '(prefers-color-scheme: dark)',
            color: 'black',
        },
    ],
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={clsx(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                <Providers
                    themeProps={{
                        attribute: 'class',
                        defaultTheme: 'dark',
                    }}
                >
                    <div className="relative flex flex-col h-screen">
                        {/* @ts-expect-error next version of TS will fix this */}
                        <NavbarWrapper />
                        <main className="container mx-auto max-w-xl pt-16 px-6 flex-grow">
                            {children}
                        </main>
                        <footer className="w-full flex items-center justify-center py-3">
                            <p className="text-xs text-default-400">
                                &copy; {moment().year()} YayLinda Inc.
                            </p>
                        </footer>
                    </div>
                    <AuthModal />
                </Providers>
            </body>
        </html>
    );
}
