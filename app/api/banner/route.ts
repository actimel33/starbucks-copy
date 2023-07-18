import { NextRequest, NextResponse } from 'next/server';

import prisma from '@lib/prisma';

export async function POST(req: NextRequest) {
  const { userId, bannerId, ...rest } = await req.json();

  let ip = req.ip ?? req.headers.get('x-real-ip');

  const forwardedFor = req.headers.get('x-forwarded-for');

  if (!ip && forwardedFor) {
    ip = forwardedFor.split(',').at(0) ?? 'Unknown';
  }

  const lastRecord = await prisma.banners.findFirst({
    where: { userId: userId, id: bannerId },
  });

  const clickCounter = lastRecord?.clickCounter ? lastRecord.clickCounter + 1 : 1;

  const fullInfo = JSON.stringify({ ...rest, ip });

  console.log();

  await prisma.banners.updateMany({
    where: {
      id: bannerId,
      userId,
    },
    data: {
      clickCounter,
      clickInformation: fullInfo,
    },
  });

  return NextResponse.json({ message: 'Banner was updated' });
}
