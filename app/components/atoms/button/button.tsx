'use client';

import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import Link from 'next/link';

import './styles.css';

export type TButtonVariants = 'btn-light-outlined' | 'btn-dark-outlined' | 'btn-dark' | 'btn-green';

interface IProps extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: TButtonVariants;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLink?: boolean;
  href?: string;
  className?: string;
}

export default function Button({
  children,
  variant = 'btn-light-outlined',
  onClick = () => {},
  href,
  className,
  ...rest
}: IProps) {
  return !href ? (
    <button className={clsx('btn', 'text-sm', variant, className)} onClick={e => onClick(e)} {...rest}>
      {children}
    </button>
  ) : (
    <Link className={clsx('btn', 'link', className)} href={href} {...rest}>
      {children}
    </Link>
  );
}
