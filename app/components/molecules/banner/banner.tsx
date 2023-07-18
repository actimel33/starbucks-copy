'use client';
import clsx from 'clsx';
import { useCallback } from 'react';

import Image from 'next/image';

import Button from '@components/atoms/button';
import { TButtonVariants } from '@components/atoms/button/button';

import classes from './styles.module.css';

export interface IBannerProps {
  backgroundCollor: string;
  bannerTextCollor: string;
  buttonVariant: TButtonVariants;
  imageUrl: string;
  imageHeight: number;
  isReverted: boolean;
  isSpecialBanner: boolean;
  buttonText: string;
  bannerHeadingText: string;
  bannerText: string;
  position: number;
  id: string;
}

export default function Banner({
  id,
  isReverted = false,
  isSpecialBanner = false,
  backgroundCollor,
  imageUrl,
  imageHeight,
  bannerTextCollor,
  buttonVariant,
  buttonText,
  bannerHeadingText,
  bannerText,
  ...rest
}: IBannerProps) {
  const {
    box,
    gridCol2,
    gridReversed,
    textCenter,
    imageContainer,
    boxInner,
    pyMd,
    textLg,
    textMd,
    textXl,
    textRegular,
    textBold,
  } = classes;

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
    <section
      className={clsx(box, gridCol2, { [gridReversed]: !isReverted }, textCenter)}
      style={{ backgroundColor: backgroundCollor }}
    >
      <div className={imageContainer} style={{ minHeight: imageHeight }}>
        <Image alt="Banner" fill={true} src={imageUrl} />
      </div>
      <div className={clsx(boxInner, pyMd)}>
        <h2 className={clsx(isSpecialBanner ? textLg : textXl, textBold)} style={{ color: bannerTextCollor }}>
          {bannerHeadingText}
        </h2>
        <p
          className={clsx(isSpecialBanner ? textMd : textLg, isSpecialBanner ? textBold : textRegular)}
          style={{ color: bannerTextCollor }}
        >
          {bannerText}
        </p>
        <Button onClick={() => handleOnClick()} variant={buttonVariant}>
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
