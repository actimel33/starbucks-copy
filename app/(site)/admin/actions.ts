'use server';

import { getServerSession } from 'next-auth/next';

import { authOptions } from '@app/api/auth/[...nextauth]/options';
import prisma from '@lib/prisma';

export async function addBanner(props: any) {
  const session = await getServerSession(authOptions);

  if (session?.uid) {
    const lastRecord = await prisma.banners.findFirst({
      where: { userId: session.uid },

      orderBy: {
        position: 'desc',
      },
    });

    const position = lastRecord ? lastRecord.position + 1 : 0;

    await prisma.banners.create({
      data: {
        ...props,
        imageHeight: +props.imageHeight,
        userId: session.uid,
        position: position,
      },
    });
  }
}
