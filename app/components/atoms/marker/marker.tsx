import clsx from 'clsx';

import Image from 'next/image';
import Link from 'next/link';

import { Routes } from '@app/types.d';

import classes from './styles.module.css';

export default function Marker() {
  const { navbarNavItemLink, navBarRightMarkerLink, marker } = classes;

  return (
    <Link className={clsx(navbarNavItemLink, navBarRightMarkerLink)} href={Routes.HOME_PAGE}>
      <Image alt={'Marker'} className={marker} height={20} src={'/marker.svg'} width={20} />
      <span>Find A Store</span>
    </Link>
  );
}
