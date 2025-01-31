import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from 'remote3/AuthContext';
import { ProtectedRoute } from 'remote3/ProtectedRoute';
import Auth from './components/Auth';
import Cart from './components/Cart';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

const ProductsApp = React.lazy(() => import('remote1/ProductsApp'));

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ 
          minHeight: '100vh', 
          backgroundColor: '#f8fafc',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
          <Navbar />
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto',
            padding: '2rem',
            paddingTop: '5rem'
          }}>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/auth/*" element={<Auth />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <ProductsApp />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App; 