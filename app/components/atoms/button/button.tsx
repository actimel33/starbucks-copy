'use client';

import clsx from 'clsx';
import { PropsWithChildren, useCallback } from 'react';

import Link from 'next/link';

import classes from './styles.module.css';

export type TButtonVariants = 'white' | 'light' | 'dark' | 'green';

interface IProps extends PropsWithChildren {
  variant?: TButtonVariants;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLink?: boolean;
  href?: string;
}

export default function Button({ children, variant, onClick = () => {}, href }: IProps) {
  const { btn, btnWhiteOutlined, btnDarkOutlined, btnLigthOutlined, btnGreen, link } = classes;
  let className: string;

  switch (variant) {
    case 'dark':
      className = btnDarkOutlined;
      break;
    case 'light':
      className = btnLigthOutlined;
      break;
    case 'green':
      className = btnGreen;
      break;
    default:
      className = btnWhiteOutlined;
  }

  return !href ? (
    <button className={clsx(btn, className)} onClick={e => onClick(e)}>
      {children}
    </button>
  ) : (
    <Link className={clsx(btn, className, link)} href={href}>
      {children}
    </Link>
  );
}
