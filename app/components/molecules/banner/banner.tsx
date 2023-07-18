'use client';
import clsx from 'clsx';
import { useCallback } from 'react';

import Image from 'next/image';

import { IAdminFormDefaultValues } from '@app/(site)/admin/page';
import Button from '@components/atoms/button';
// import { fetchBanners } from '@lib/fetchBanners';

import classes from './styles.module.css';

export const revalidate = 10;

// export async function generateStaticParams() {
//   const data = await fetchBanners();

//   return data?.banners || [];
// }

export default function Banner({
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
}: IAdminFormDefaultValues) {
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
      width: window.innerWidth,
      height: window.innerHeight,
      userAgent: window.navigator.userAgent,
      userId: rest.userId,
      bannerId: rest.bannerId,
      position: rest.position,
    };

    fetch('/api/banner', {
      method: 'POST',
      body: JSON.stringify(infoOnTheUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, [rest]);

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
