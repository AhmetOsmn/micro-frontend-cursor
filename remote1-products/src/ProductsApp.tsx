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
    <div>
      <h2>Ürünler</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', padding: '1rem' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p style={{ fontWeight: 'bold' }}>{product.price.toLocaleString('tr-TR')} ₺</p>
            <button 
              onClick={() => addToCart(product)}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsApp; 