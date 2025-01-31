import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import AuthApp from './AuthApp';
import { AuthProvider } from './context/AuthContext';

// Root instance'ı global olarak tut
let root: ReturnType<typeof createRoot> | null = null;

const mount = (el: HTMLElement) => {
  console.log('Auth app mounting...', {
    currentPath: window.location.pathname,
    port: window.location.port
  });

  if (!root) {
    root = createRoot(el);
  }

  const currentPath = window.location.pathname;
  const basePath = currentPath.startsWith('/auth') ? currentPath.replace('/auth', '') : currentPath;

  root.render(
    <React.StrictMode>
      <AuthProvider>
        <MemoryRouter initialEntries={[basePath]}>
          <AuthApp />
        </MemoryRouter>
      </AuthProvider>
    </React.StrictMode>
  );

  return {
    unmount: () => {
      return new Promise<void>((resolve) => {
        console.log('Auth app unmounting...');
        if (root) {
          root.unmount();
          root = null;
          resolve();
        } else {
          resolve();
        }
      });
    },
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('auth-root');
  if (devRoot) {
    const isStandalone = window.location.port === '3003';
    if (isStandalone) {
      mount(devRoot);
    }
  }
}

export { mount };

