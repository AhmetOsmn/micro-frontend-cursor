import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  total: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const location = useLocation();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:3004/cart');
        if (response.ok) {
          const data = await response.json();
          setCart(data);
        }
      } catch (error) {
        console.error('Sepet yüklenirken hata oluştu:', error);
      }
    };

    fetchCart();
  }, [location]);

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Sepetim</h2>
      {cart.items.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <div>
          {cart.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <p style={{ margin: '0.5rem 0', color: '#666' }}>
                  {item.price.toLocaleString('tr-TR')} ₺ x {item.quantity}
                </p>
              </div>
              <div style={{ fontWeight: 'bold' }}>
                {(item.price * item.quantity).toLocaleString('tr-TR')} ₺
              </div>
            </div>
          ))}
          <div
            style={{
              marginTop: '2rem',
              padding: '1rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>Toplam</h3>
              <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                {cart.total.toLocaleString('tr-TR')} ₺
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 