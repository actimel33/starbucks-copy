import './globals.css';

import clsx from 'clsx';
import type { Metadata } from 'next';

import { Roboto } from 'next/font/google';
import Head from 'next/head';

import Layout from '@components/organisms/root-layout';
import AuthContext from '@context/AuthContext';

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '500', '700', '900'] });

export const metadata: Metadata = {
  title: 'Starbucks Coffy Company',
  description:
    'More than just great coffee. Explore the menu, sign up for Starbucks® Rewards, manage your gift card and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-full" lang="en">
      <Head>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      </Head>
      <body className={clsx(roboto.className, 'h-full', 'body-grid')}>
        <AuthContext>
          <Layout>{children}</Layout>
        </AuthContext>
      </body>
    </html>
  );
}
