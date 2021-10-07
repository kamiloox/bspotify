import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      black: string;
      white: string;
      gray: string;
      darkGray: string;
      lightGray: string;
      primary: string;
      error: string;
      success: string;
    };
    fontSize: {
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
      xxl: string;
    };
    fontWeight: {
      regular: string;
      medium: string;
      bold: string;
    };
  }
}
