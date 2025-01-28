import { FC, ReactNode } from 'react';

declare module 'shared-ui' {
  interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
  }
  export const Button: FC<ButtonProps>;
} 