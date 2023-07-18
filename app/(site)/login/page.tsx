'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import LoginForm from '@components/molecules/login-form';
import PageLayout from '@components/organisms/page-layout';

import classes from './styles.module.css';

export default function Login() {
  const { data, status } = useSession();
  const searchParams = useSearchParams();
  const { container, textSection, text } = classes;

  const callbackUrl = searchParams.get('callbackUrl') || '';

  if (data && callbackUrl) {
    redirect(callbackUrl);
  }

  if (status === 'loading') {
    return <>...Loading</>;
  }

  return (
    <PageLayout>
      <div className={container}>
        <section className={textSection}>
          <h1 className={text}>Sign in or create an account</h1>
        </section>
        <LoginForm />
        <br />
        <div>
          email: <b>test@email.com</b>
        </div>
        <div>
          name: <b>Jon Dou</b>
        </div>
        <div>
          password: <b>123</b>
        </div>
      </div>
    </PageLayout>
  );
}
