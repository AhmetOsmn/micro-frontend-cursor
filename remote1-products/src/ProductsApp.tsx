import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductsApp = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addToCart = async (product: Product) => {
    try {
      // Önce mevcut sepeti al
      const cartResponse = await fetch('http://localhost:3004/cart');
      const cartData = await cartResponse.json();
      
      // Ürün sepette var mı kontrol et
      const existingItemIndex = cartData.items?.findIndex((item: any) => item.id === product.id);
      let newItems = [];
      
      if (existingItemIndex >= 0) {
        // Ürün sepette varsa miktarını artır
        newItems = cartData.items.map((item: any, index: number) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        // Ürün sepette yoksa yeni ekle
        newItems = [...(cartData.items || []), { ...product, quantity: 1 }];
      }

      // Toplam tutarı hesapla
      const total = newItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

      // Sepeti güncelle
      const updateResponse = await fetch('http://localhost:3004/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: newItems,
          total
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Sepet güncellenirken bir hata oluştu');
      }

      // Container'a cart güncellemesini bildir
      window.dispatchEvent(
        new CustomEvent('cartUpdate', { 
          detail: { items: newItems, total }
        })
      );
    } catch (err) {
      console.error('Sepete eklenirken hata:', err);
      alert('Ürün sepete eklenirken bir hata oluştu');
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3004/products');
        if (!response.ok) {
          throw new Error('Ürünler yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Ürünler yükleniyor...</div>;
  }

  if (error) {
    return <div>Hata: {error}</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{
        fontSize: '2rem',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '2rem',
        borderBottom: '2px solid #e5e7eb',
        paddingBottom: '0.5rem'
      }}>Ürünler</h2>
      
      {loading && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
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
          <span style={{ color: '#4b5563' }}>Ürünler yükleniyor...</span>
        </div>
      )}

      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          padding: '1rem',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span>⚠️</span>
          <span>Hata: {error}</span>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem',
        padding: '1rem 0'
      }}>
        {products.map((product) => (
          <div key={product.id} style={{
            border: '1px solid #e5e7eb',
            borderRadius: '1rem',
            overflow: 'hidden',
            backgroundColor: 'white',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{
              position: 'relative',
              paddingTop: '75%',
              overflow: 'hidden'
            }}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </div>
            
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>{product.name}</h3>
              
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                marginBottom: '1rem',
                lineHeight: '1.5'
              }}>{product.description}</p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto'
              }}>
                <p style={{
                  fontWeight: '600',
                  color: '#2563eb',
                  fontSize: '1.25rem'
                }}>{product.price.toLocaleString('tr-TR')} ₺</p>
                
                <button 
                  onClick={() => addToCart(product)}
                  style={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <span>🛒</span>
                  Sepete Ekle
                </button>
              </div>
            </div>
          </div>
        ))}
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
    </div>
  );
};

export default ProductsApp; 