import React from 'react';
import { createRoot } from 'react-dom/client';
import AuthApp from './AuthApp';

const mount = (el: HTMLElement) => {
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <AuthApp />
    </React.StrictMode>
  );
  
  return {
    unmount: () => {
      root.unmount();
    },
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('auth-root');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };

