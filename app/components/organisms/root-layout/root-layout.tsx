import React, { PropsWithChildren } from 'react';

import Footer from '@components/molecules/footer';
import Header from '@components/molecules/header';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
