import { DefaultTheme } from 'styled-components';

export const defaultTheme: DefaultTheme = {
  color: {
    black: '#000000',
    white: '#ffffff',
    gray: '#9c9c9c',
    darkGray: '#525152',
    lightGray: '#e7e7e7',
    primary: '#f2dea5',
    error: '#e56b6f',
    success: '#95d5b2',
  },
  fontSize: {
    xs: '1.2rem',
    s: '1.4rem',
    m: '1.6rem',
    l: '2rem',
    xl: '2.4rem',
    xxl: '3.6rem',
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
  breakpoint: {
    mobile: '(min-width: 375px)',
    tabletPort: '(min-width: 768px)',
    tabletLand: '(min-width: 1024px)',
    largeScreen: '(min-width: 1920px)',
  },
};
