import React, { useEffect, useRef } from 'react';
import { mount } from 'remote2/CartApp';

const Cart: React.FC = () => {
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cartRef.current) {
      const { unmount } = mount(cartRef.current);
      return unmount;
    }
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <div ref={cartRef}></div>
    </div>
  );
};

export default Cart; 