'use client';

import PageLayout from '@app/components/organisms/page-layout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <PageLayout>{children}</PageLayout>;
}
