import cx from 'classnames';
import { Toaster } from 'react-hot-toast';
import type { Metadata, Viewport } from 'next';
import { Inter, Orbitron } from 'next/font/google';

import { Layout } from '@/components/Layout';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-logo',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Jhonny Vargas Arias | Portfolio',
  description:
    "Jhonny Vargas Arias' portfolio showcasing software engineering projects, skills, and experience in front-end and back-end development. Connect with me on GitHub: https://github.com/jhonny17",
  openGraph: {
    type: 'website',
    url: 'https://jhonnyvargasarias.com',
    title: 'Jhonny Vargas Arias | Portfolio',
    description:
      "Explore Jhonny Vargas Arias' portfolio featuring innovative software engineering projects and comprehensive skills in modern technologies.",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cx(inter.className, orbitron.variable)}>
        <Layout>
          {children}
          <Toaster />
        </Layout>
      </body>
    </html>
  );
}
