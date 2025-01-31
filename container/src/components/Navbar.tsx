import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from 'remote3/AuthContext';

interface CartData {
  items: any[];
  total: number;
}

const Navbar: React.FC = () => {
  const [cart, setCart] = useState<CartData>({ items: [], total: 0 });
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleCartUpdate = (event: CustomEvent<CartData>) => {
      setCart(event.detail);
    };

    window.addEventListener('cartUpdate' as any, handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdate' as any, handleCartUpdate);
    };
  }, []);

  return (
    <nav style={{
      backgroundColor: '#2563eb',
      padding: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            letterSpacing: '-0.025em'
          }}>
            🛍️ MicroShop
          </Link>
          {user && (
            <Link to="/products" style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: location.pathname === '/products' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              transition: 'all 0.2s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              📦 Ürünler
            </Link>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {user ? (
            <>
              <span style={{ color: 'white', opacity: 0.8 }}>
                Merhaba, {user.name}
              </span>
              <button
                onClick={logout}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Çıkış Yap
              </button>
              <Link
                to="/cart"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  opacity: 0.9,
                  transition: 'all 0.2s ease-in-out',
                  textDecoration: 'none',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  🛒
                  {cart.items.length > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      backgroundColor: '#ef4444',
                      color: 'white',
                      borderRadius: '9999px',
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.75rem',
                      minWidth: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      {cart.items.length}
                    </span>
                  )}
                </div>
                <span>Sepet ({cart.total.toLocaleString('tr-TR')} ₺)</span>
              </Link>
            </>
          ) : (
            <Link to="/auth/login" style={{
              color: 'white',
              textDecoration: 'none',
              opacity: location.pathname === '/auth/login' ? 1 : 0.8,
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: location.pathname === '/auth/login' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              transition: 'all 0.2s ease-in-out'
            }}>
              Giriş Yap
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 