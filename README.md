# Mikro Frontend E-Ticaret Uygulaması

Bu proje, modern web geliştirme tekniklerini kullanarak oluşturulmuş bir mikro frontend mimarisi örneğidir. Farklı frontend framework'lerini (React ve Vue.js) bir arada kullanarak modüler ve ölçeklenebilir bir e-ticaret uygulaması geliştirilmiştir.

## 🏗️ Proje Yapısı

Proje aşağıdaki mikro frontend'lerden oluşmaktadır:

- **Container (Ana Uygulama)**: React tabanlı ana uygulama (`localhost:3000`)
  - Diğer mikro frontend'leri birleştirir
  - Routing ve navigasyon yönetimi
  - Global durum yönetimi (sepet durumu)

- **Products (Ürünler)**: React tabanlı ürün listesi uygulaması
  - Ürün kataloğu görüntüleme
  - Ürün detayları
  - Sepete ekleme fonksiyonalitesi

- **Cart (Sepet)**: Vue.js tabanlı sepet uygulaması
  - Sepet içeriği görüntüleme
  - Ürün kaldırma
  - Toplam fiyat hesaplama

- **Backend**: JSON Server tabanlı mock API (`localhost:3004`)
  - Ürün ve sepet verilerinin yönetimi
  - RESTful API endpoints

## 🚀 Başlangıç

1. Bağımlılıkları yükleyin:
   ```bash
   pnpm install
   ```

2. Backend servisini başlatın:
   ```bash
   cd server
   pnpm start
   ```

3. Mikro frontend'leri başlatın:
   ```bash
   # Container
   cd container
   pnpm start

   # Products
   cd remote1-products
   pnpm start

   # Cart
   cd remote2-cart
   pnpm start
   ```

## 🛠️ Teknolojiler

- **Frontend**:
  - React 18
  - Vue.js 3
  - TypeScript
  - React Router
  - Module Federation
  - Webpack 5

- **Backend**:
  - JSON Server
  - RESTful API

## 🔄 İletişim Mekanizması

Mikro frontend'ler arası iletişim aşağıdaki yöntemlerle sağlanmaktadır:

1. **Custom Events**: Sepet güncellemeleri için
2. **Module Federation**: Mikro frontend'lerin paylaşımı için
3. **REST API**: Veri yönetimi için

## 📦 Proje Yapılandırması

```
micro-frontend-cursor/
├── container/           # Ana uygulama (React)
├── remote1-products/    # Ürünler uygulaması (React)
├── remote2-cart/        # Sepet uygulaması (Vue.js)
├── shared-ui/          # Paylaşılan UI bileşenleri
└── server/             # Mock API (JSON Server)
```

## 🌟 Özellikler

- Modern ve responsive tasarım
- Mikro frontend mimarisi
- Framework-agnostic yapı
- Gerçek zamanlı sepet güncellemeleri
- TypeScript ile tip güvenliği
- Modüler ve ölçeklenebilir mimari

## 🤝 Katkıda Bulunma

1. Bu repo'yu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request oluşturun
