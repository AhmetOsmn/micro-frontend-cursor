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