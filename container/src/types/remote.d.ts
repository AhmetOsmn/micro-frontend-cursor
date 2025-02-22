declare module 'remote1/ProductsApp' {
  const ProductsApp: React.ComponentType;
  export default ProductsApp;
}

declare module 'remote2/CartApp' {
  interface CartItem {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    quantity: number;
  }

  interface Cart {
    items: CartItem[];
    total: number;
  }

  interface MountFn {
    (el: HTMLElement): {
      unmount(): void;
    };
  }
  export const mount: MountFn;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'remote2-cart': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

declare global {
  interface CustomEventMap {
    'cartUpdate': CustomEvent<Cart>;
    'addToCart': CustomEvent<CartItem>;
    'updateCartItem': CustomEvent<{ id: number; quantity: number }>;
  }
}

declare module 'remote3/AuthContext' {
  import { FC, ReactNode } from 'react';

  export interface User {
    id: string;
    email: string;
    name: string;
  }

  export interface AuthContextType {
    user: User | null;
    logout: () => void;
  }

  export const AuthProvider: FC<{ children: ReactNode }>;
  export const useAuth: () => AuthContextType;
}

declare module 'remote3/ProtectedRoute' {
  import { FC, ReactNode } from 'react';
  
  export interface ProtectedRouteProps {
    children: ReactNode;
  }

  export const ProtectedRoute: FC<ProtectedRouteProps>;
}

declare module 'remote3/AuthApp' {
  const AuthApp: React.ComponentType;
  export default AuthApp;
} 