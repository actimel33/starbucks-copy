'use client';
import clsx from 'clsx';
import { useCallback } from 'react';

import Image from 'next/image';

import Button from '@components/atoms/button';
import { TButtonVariants } from '@components/atoms/button/button';

import './styles.css';

export interface IBannerProps {
  backgroundCollor: string;
  bannerTextCollor: string;
  buttonVariant: TButtonVariants;
  imageUrl: string;
  isReverted: boolean;
  buttonText: string;
  bannerHeadingText: string;
  bannerText: string;
  position: number;
  id: string;
}

export default function Banner({
  id,
  isReverted = false,
  backgroundCollor,
  imageUrl,
  bannerTextCollor,
  buttonVariant,
  buttonText,
  bannerHeadingText,
  bannerText,
  ...rest
}: IBannerProps) {
  const handleOnClick = useCallback(async () => {
    const infoOnTheUser = {
      bannerHeadingText,
      bannerText,
      buttonText,
      width: window.innerWidth,
      height: window.innerHeight,
      userAgent: window.navigator.userAgent,
      position: rest.position,
      bannerId: id,
    };

    fetch('/api/banner', {
      method: 'POST',
      body: JSON.stringify(infoOnTheUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, [bannerHeadingText, bannerText, buttonText, id, rest.position]);

  return (
    <section className="box grid-col-2" style={{ backgroundColor: backgroundCollor }}>
      <div className="image-container">
        <Image alt="Banner" fill={true} objectFit="cover" objectPosition="center" src={imageUrl} unoptimized={true} />
      </div>

      <div className="box-text" style={{ color: bannerTextCollor }}>
        <h2 className={clsx('text-xl', 'mb-md')}> {bannerHeadingText}</h2>
        <p className={clsx('text-md', 'mb-md')} style={{ color: bannerTextCollor }}>
          {bannerText}
        </p>
        <Button
          onClick={() => handleOnClick()}
          style={{ color: bannerTextCollor, borderColor: bannerTextCollor }}
          variant={'btn-dark-outlined'}
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
