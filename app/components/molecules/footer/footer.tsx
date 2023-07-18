import clsx from 'clsx';

import Image from 'next/image';
import Link from 'next/link';

import classes from './styles.module.css';

export default function Footer() {
  const { footer, footerContainer, social } = classes;

  return (
    <footer className={footer}>
      <div className={footerContainer}>
        <div className={social}>
          <Link href={'/'}>
            <Image alt="spotify" height={32} src={'/social-spotify.svg'} width={32} />
          </Link>
          <Link href={'/'}>
            <Image alt="facebook" height={32} src={'/social-facebook.svg'} width={32} />
          </Link>
          <Link href={'/'}>
            <Image alt="pinterest" height={32} src={'/social-pinterest.svg'} width={32} />
          </Link>
          <Link href={'/'}>
            <Image alt="instagram" height={32} src={'/social-instagram.svg'} width={32} />
          </Link>
          <Link href={'/'}>
            <Image alt="youtube" height={32} src={'/social-youtube.svg'} width={32} />
          </Link>
          <Link href={'/'}>
            <Image alt="twitter" height={32} src={'/social-twitter.svg'} width={32} />
          </Link>
        </div>
        <p>© 2023 Starbucks Coffee Company. All rights reserved.</p>
      </div>
    </footer>
  );
}
