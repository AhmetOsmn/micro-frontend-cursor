import { createApp } from 'vue';
import CartApp from './CartApp.vue';

const mount = (el: HTMLElement) => {
  const app = createApp(CartApp);
  app.mount(el);

  return {
    unmount: () => {
      app.unmount();
    }
  };
};

// Development ve standalone
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#root');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
