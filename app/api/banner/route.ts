import { NextRequest, NextResponse } from 'next/server';

import prisma from '@lib/prisma';

export async function POST(req: NextRequest) {
  const { userId, bannerId, ...rest } = await req.json();

  let ip = req.ip ?? req.headers.get('x-real-ip');

  const forwardedFor = req.headers.get('x-forwarded-for');

  if (!ip && forwardedFor) {
    ip = forwardedFor.split(',').at(0) ?? 'Unknown';
  }

  const bannerClickInfoDoc = await prisma.clickInfo.findFirst({
    where: { userIp: ip as string, bannerId },
  });

  const clickCounter = bannerClickInfoDoc?.clickCounter ? bannerClickInfoDoc.clickCounter + 1 : 1;

  const fullInfo = JSON.stringify({ ...rest, ip });

  if (!bannerClickInfoDoc) {
    await prisma.clickInfo.create({
      data: {
        userIp: ip as string,
        bannerId,
        bannerPosition: rest.position,
        clickCounter,
        clickInformation: fullInfo,
      },
    });
  } else {
    await prisma.clickInfo.updateMany({
      where: {
        bannerId,
      },
      data: {
        clickCounter,
        clickInformation: fullInfo,
      },
    });
  }

  return NextResponse.json({ message: 'Banner was updated' });
}
