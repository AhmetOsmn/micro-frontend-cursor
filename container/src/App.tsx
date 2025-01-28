import React, { Suspense, useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
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

const Navbar = () => {
  const [cart, setCart] = useState<CartData>({ items: [], total: 0 });
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
    <nav style={{
      backgroundColor: '#007bff',
      padding: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
            fontWeight: 'bold'
          }}>
            Micro Frontend Demo
          </Link>
          <Link to="/products" style={{
            color: 'white',
            textDecoration: 'none',
            opacity: location.pathname === '/products' ? 1 : 0.8
          }}>
            Ürünler
          </Link>
        </div>
        
        <Link
          to="/cart"
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            opacity: 0.9,
            transition: 'all 0.2s ease-in-out',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.backgroundColor = 'transparent';
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
                backgroundColor: '#dc3545',
                color: 'white',
                borderRadius: '50%',
                padding: '0.2rem 0.5rem',
                fontSize: '0.8rem',
                minWidth: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cart.items.length}
              </span>
            )}
          </div>
          <span>Sepet ({cart.total.toLocaleString('tr-TR')} ₺)</span>
        </Link>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router {...router}>
      <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <Navbar />
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '5rem 1rem 1rem 1rem'
        }}>
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Yükleniyor...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductsApp />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default App; 