import { PropsWithChildren } from 'react';

import classes from './styles.module.css';

export default function PageLayout({ children }: PropsWithChildren) {
  const { pageLayoutContainer } = classes;

  return <div className={pageLayoutContainer}>{children}</div>;
}
