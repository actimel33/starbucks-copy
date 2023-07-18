import { getServerSession } from 'next-auth/next';

import { authOptions } from '@app/api/auth/[...nextauth]/options';
import prisma from '@lib/prisma';

export async function fetchBanners() {
  const session = await getServerSession(authOptions);

  let res;
  if (session?.uid) {
    res = await prisma.user.findUnique({
      where: {
        id: session.uid,
      },
      include: {
        banners: true,
      },
    });
  }

  return res;
}
