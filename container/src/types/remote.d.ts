declare module 'remote1/ProductsApp' {
  const ProductsApp: React.ComponentType;
  export default ProductsApp;
}

declare module 'remote2/CartApp' {
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