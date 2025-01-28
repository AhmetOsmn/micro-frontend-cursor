import React from 'react';
import { createRoot } from 'react-dom/client';
import ProductsApp from './ProductsApp';

const mount = (el: HTMLElement) => {
  let root: any = null;
  
  const render = () => {
    if (!root) {
      root = createRoot(el);
    }
    root.render(
      <div style={{ width: '100%', height: '100%' }}>
        <ProductsApp />
      </div>
    );
  };

  const unmount = () => {
    if (root) {
      root.unmount();
      root = null;
    }
  };

  render();

  return { render, unmount };
};

// Development ve standalone
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('root');
  if (devRoot) {
    mount(devRoot);
  }
}

export default mount;

