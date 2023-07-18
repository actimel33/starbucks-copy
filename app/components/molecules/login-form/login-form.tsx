'use client';

import clsx from 'clsx';
import { useCallback, useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import Button from '@components/atoms/button';

import classes from './styles.module.css';

export interface IFormDefaultValues {
  nameOrEmail: string;
  password: string;
}

const defaultValues: IFormDefaultValues = { nameOrEmail: '', password: '' };

export default function LoginForm() {
  const {
    formContainer,
    formPadding,
    form,
    hintText,
    labelInput,
    inputField,
    labelField,
    inputNotValid,
    inputValid,
    passwordLabel,
    errorSection,
    redBorder,
    linkBlock,
    signinContainer,
    serverError,
  } = classes;
  const [loginError, setLoginError] = useState<string>();
  const { control, handleSubmit } = useForm<IFormDefaultValues>({
    defaultValues,
  });
  const onSubmitAction = useCallback(async (formValues: FieldValues) => {
    const response = await signIn('credentials', {
      ...formValues,
      redirect: false,
    });

    setLoginError(() => response?.error);
  }, []);

  return (
    <div className={formContainer}>
      <div className={formPadding}>
        <div className={hintText}>
          <p>
            <span>*</span> indicates required field
          </p>
        </div>
        <form className={form} onSubmit={handleSubmit(onSubmitAction)}>
          <Controller
            control={control}
            name="nameOrEmail"
            render={({ field: { ...rest }, fieldState: { error, isTouched } }) => (
              <>
                <div className={labelInput}>
                  <input
                    className={clsx(
                      inputField,
                      { [inputNotValid]: isTouched && !rest.value },
                      { [redBorder]: isTouched && !rest.value },
                    )}
                    id="nameOrEmail"
                    type="text"
                    {...rest}
                    required
                  />
                  <label
                    className={clsx(labelField, isTouched && !rest.value ? inputNotValid : inputValid)}
                    htmlFor="nameOrEmail"
                  >
                    <span>* Username or email address</span>
                  </label>
                </div>
                {isTouched && !rest.value && (
                  <div className={clsx(errorSection)}>
                    <Image alt={'crossed'} height={15} src={'/icons-close.svg'} width={15} />
                    Enter an email/username.
                  </div>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { ...rest }, fieldState: { isTouched } }) => (
              <>
                <div className={labelInput}>
                  <input
                    className={clsx(
                      inputField,
                      { [inputNotValid]: isTouched && !rest.value },
                      { [redBorder]: isTouched && !rest.value },
                    )}
                    id="password"
                    type="password"
                    required
                    {...rest}
                  />
                  <label
                    className={clsx(labelField, isTouched && !rest.value ? inputNotValid : inputValid, passwordLabel)}
                    htmlFor="password"
                  >
                    <span>* Password</span>
                  </label>
                </div>
                {isTouched && !rest.value && (
                  <div className={clsx(errorSection)}>
                    <Image alt={'crossed'} height={15} src={'/icons-close.svg'} width={15} />
                    Enter a password.
                  </div>
                )}
              </>
            )}
          />
          <div className={linkBlock}>
            <Link href="./">Forgot your username?</Link>
            <Link href="/">Forgot your password?</Link>
          </div>
          <div className={signinContainer}>
            <Button variant="green">Sign in</Button>
          </div>
        </form>
        {loginError && <div className={clsx(serverError)}>{loginError}</div>}
      </div>
    </div>
  );
}
