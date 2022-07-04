// Fixing issue in TypeScript related to styled-jsx: https://github.com/vercel/styled-jsx/issues/90
import 'react';

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}
