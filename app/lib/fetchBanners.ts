import prisma from '@lib/prisma';

export async function fetchBanners() {
  const res = await prisma.banners.findMany();

  return res;
}
