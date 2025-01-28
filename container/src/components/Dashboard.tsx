import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#333' }}>Hoş Geldiniz</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem' 
      }}>
        <Link to="/products" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease-in-out',
            cursor: 'pointer',
            transform: 'translateY(0)',
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          }}>
            <h2 style={{ color: '#007bff', marginBottom: '1rem' }}>🛍️ Ürünler</h2>
            <p style={{ color: '#666' }}>Tüm ürünleri görüntüle ve sepete ekle</p>
          </div>
        </Link>

        <Link to="/cart" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease-in-out',
            cursor: 'pointer',
            transform: 'translateY(0)',
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
          }}>
            <h2 style={{ color: '#007bff', marginBottom: '1rem' }}>🛒 Sepet</h2>
            <p style={{ color: '#666' }}>Sepetini görüntüle ve siparişini tamamla</p>
          </div>
        </Link>
      </div>

      <div style={{ 
        marginTop: '3rem',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>Micro Frontend Demo</h2>
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          Bu uygulama, modern web geliştirme tekniklerini kullanarak oluşturulmuş bir micro frontend demo projesidir.
          React ve Vue.js gibi farklı framework'leri bir arada kullanarak modüler ve ölçeklenebilir bir yapı oluşturulmuştur.
        </p>
      </div>
    </div>
  );
};

export default Dashboard; 
