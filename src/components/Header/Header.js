'use client';
import React from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';
import Cookies from 'js-cookie';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';
import { DARK_TOKENS, LIGHT_TOKENS } from '@/constants';

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);
  const ThemeIcon = theme === 'light' ? Sun : Moon;

  function handleThemeToggle() {
    let nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);

    Cookies.set('theme', nextTheme, {
      expires: 1000,
    });

    const nextTokens = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    const root = document.documentElement;
    Object.entries(nextTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    root.setAttribute('data-color-theme', nextTheme);
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button className={styles.action} onClick={handleThemeToggle}>
          <ThemeIcon size="1.5rem" />
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
