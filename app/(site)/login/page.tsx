'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Routes } from '@app/types.d';
import LoginForm from '@components/molecules/login-form';
import PageLayout from '@components/organisms/page-layout';

import classes from './styles.module.css';

export default function Login() {
  const { data: session, status } = useSession();
  const { container, textSection, text } = classes;

  if (session) {
    redirect(Routes.HOME_PAGE);
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
