'use client';
import clsx from 'clsx';
import { useState, useCallback } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import { Routes } from '@app/types.d';
import Button from '@components/atoms/button';
import Marker from '@components/atoms/marker';
import MobileMenu from '@components/molecules/mobile-menu';

import classes from './styles.module.css';

const navbarLeftItems = ['menu', 'rewards', 'gift cards'];

export default function Header() {
  const {
    navbar,
    logo,
    navbarContainer,
    navbarBrand,
    navbarNav,
    navbarNavLeft,
    navbarNavRight,
    navbarNavItem,
    navbarNavItemLink,
    navBarRightMarker,
    hamburger,
    hamburgerTop,
    hamburgerMiddle,
    hamburgerBottom,
    isHamburgerOpen,
  } = classes;

  const { data: session, status } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const isLoading = status === 'loading';
  const handleHamburgerClick = useCallback(() => {
    setIsMenuOpen(state => !state);
    document.body.classList.toggle('no-scroll');
  }, []);

  return (
    <header className={navbar}>
      <nav className={navbarContainer}>
        <div className={navbarBrand}>
          <Link href={Routes.HOME_PAGE}>
            <Image alt={'Starbucks'} className={logo} height={50} src={'/logo.svg'} width={50} />
          </Link>
        </div>

        <ul className={clsx(navbarNav, navbarNavLeft)}>
          {navbarLeftItems.map(item => (
            <li key={item} className={navbarNavItem}>
              <Link className={clsx(navbarNavItemLink)} href={Routes.HOME_PAGE}>
                {item}
              </Link>
            </li>
          ))}
        </ul>

        <ul className={clsx(navbarNav, navbarNavRight)}>
          <li className={navBarRightMarker}>
            <Marker />
          </li>
          {!session && !isLoading && (
            <>
              <li>
                <Button href={Routes.LOGNIN_PAGE}>Sign in</Button>
              </li>
              <li>
                <Button variant="dark">Join now</Button>
              </li>
            </>
          )}
          {session && !isLoading && (
            <li>
              <Button onClick={() => signOut()}>Log out</Button>
            </li>
          )}
        </ul>

        {/* Hamburger Menu */}
        <button
          className={clsx(hamburger, { [isHamburgerOpen]: isMenuOpen })}
          id="menu-btn"
          onClick={handleHamburgerClick}
          type="button"
        >
          <span className={hamburgerTop}></span>
          <span className={hamburgerMiddle}></span>
          <span className={hamburgerBottom}></span>
        </button>
      </nav>

      <MobileMenu isOpen={isMenuOpen} navbarItems={navbarLeftItems} />
    </header>
  );
}
