import clsx from 'clsx';

import Link from 'next/link';

import { Routes } from '@app/types.d';
import Button from '@components/atoms/button';
import Marker from '@components/atoms/marker';

import classes from './styles.module.css';

interface IProps {
  isOpen: boolean;
  navbarItems: string[];
}

export default function MobileMenu({ isOpen, navbarItems }: IProps) {
  const { mobileMenu, mobileMenuList, mobileMenuBottom, hidden } = classes;

  return (
    <div className={clsx(mobileMenu, { [hidden]: !isOpen })} id="menu">
      <ul className={mobileMenuList}>
        {navbarItems.map(item => (
          <li key={item}>
            <Link className={clsx()} href={Routes.HOME_PAGE}>
              {item}
            </Link>
          </li>
        ))}
      </ul>

      <div className={mobileMenuBottom}>
        <Button>Sign in</Button>
        <Button variant="dark">Join now</Button>
        <div>
          <Marker />
        </div>
      </div>
    </div>
  );
}
