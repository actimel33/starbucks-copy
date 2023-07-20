'use server';

import { IBannerProps } from '@components/molecules/banner/banner';
import prisma from '@lib/prisma';

export async function addBannerAction(props: IBannerProps) {
  const lastRecord = await prisma.banners.findFirst({
    orderBy: {
      position: 'desc',
    },
  });

  const position = lastRecord ? lastRecord.position + 1 : 0;

  await prisma.banners.create({
    data: {
      ...props,
      position: position,
    },
  });
}
