import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import CartApp from './CartApp.vue';

const mount = (el: HTMLElement) => {
  const app = createApp(CartApp);
  
  // Toast yapılandırması
  const options = {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
  };

  app.use(Toast, options);
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
