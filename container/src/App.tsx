import React, { Suspense, useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Auth from './components/Auth';
import Cart from './components/Cart';
import Dashboard from './components/Dashboard';

// React Router future flags
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

const ProductsApp = React.lazy(() => import('remote1/ProductsApp').then(module => ({ default: module.default || module })));

interface CartData {
  items: any[];
  total: number;
}

// Event dinleyicileri için custom hook
const useCartEvents = () => {
  const [cart, setCart] = useState<CartData>({ items: [], total: 0 });

  useEffect(() => {
    const handleCartUpdate = (event: CustomEvent<CartData>) => {
      setCart(event.detail);
    };

    window.addEventListener('cartUpdate' as any, handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdate' as any, handleCartUpdate);
    };
  }, []);

  return cart;
};

const Navbar = () => {
  const cart = useCartEvents();
  const location = useLocation();

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
          <Link to="/products" style={{
            color: 'white',
            textDecoration: 'none',
            opacity: location.pathname === '/products' ? 1 : 0.8,
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: location.pathname === '/products' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            transition: 'all 0.2s ease-in-out'
          }}>
            Ürünler
          </Link>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/auth" style={{
            color: 'white',
            textDecoration: 'none',
            opacity: location.pathname === '/auth' ? 1 : 0.8,
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: location.pathname === '/auth' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            transition: 'all 0.2s ease-in-out'
          }}>
            Giriş Yap
          </Link>

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
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
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
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router {...router}>
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        <Navbar />
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '5rem 1rem 1rem 1rem'
        }}>
          <Suspense fallback={
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem',
              color: '#4b5563',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <div style={{ 
                width: '1.5rem', 
                height: '1.5rem', 
                border: '2px solid #e5e7eb',
                borderTopColor: '#3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Yükleniyor...
            </div>
          }>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductsApp />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/auth/*" element={<Auth />} />
            </Routes>
          </Suspense>
        </div>
      </div>
      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </Router>
  );
};

export default App; 