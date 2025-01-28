<template>
  <div class="cart">
    <h2>Sepetim</h2>
    <div v-if="loading">Yükleniyor...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="cart.items.length === 0" class="empty-cart">
        Sepetiniz boş
      </div>
      <div v-else class="cart-items">
        <div v-for="item in cart.items" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="cart-item-image">
          <div class="cart-item-details">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p class="price">{{ formatPrice(item.price) }} ₺</p>
          </div>
          <button @click="removeFromCart(item.id)" class="remove-button">
            Kaldır
          </button>
        </div>
        <div class="cart-total">
          <h3>Toplam: {{ formatPrice(cart.total) }} ₺</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface CartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface Cart {
  items: CartItem[];
  total: number;
}

export default defineComponent({
  name: 'CartApp',
  setup() {
    const cart = ref<Cart>({ items: [], total: 0 });
    const loading = ref(true);
    const error = ref<string | null>(null);

    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:3004/cart');
        if (!response.ok) {
          throw new Error('Sepet yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        cart.value = data;
        // Container'a cart güncellemesini bildir
        window.dispatchEvent(
          new CustomEvent('cartUpdate', { detail: data })
        );
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Bir hata oluştu';
      } finally {
        loading.value = false;
      }
    };

    const removeFromCart = async (productId: number) => {
      try {
        const updatedItems = cart.value.items.filter(item => item.id !== productId);
        const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price, 0);
        
        const response = await fetch('http://localhost:3004/cart', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: updatedItems,
            total: updatedTotal
          }),
        });

        if (!response.ok) {
          throw new Error('Ürün sepetten kaldırılırken bir hata oluştu');
        }

        cart.value.items = updatedItems;
        cart.value.total = updatedTotal;
        // Container'a cart güncellemesini bildir
        window.dispatchEvent(
          new CustomEvent('cartUpdate', { 
            detail: { items: updatedItems, total: updatedTotal }
          })
        );
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Bir hata oluştu';
      }
    };

    const formatPrice = (price: number) => {
      return price.toLocaleString('tr-TR');
    };

    onMounted(() => {
      fetchCart();
    });

    return {
      cart,
      loading,
      error,
      removeFromCart,
      formatPrice
    };
  }
});
</script>

<style scoped>
.cart {
  padding: 1rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  gap: 1rem;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.cart-item-details {
  flex: 1;
}

.price {
  font-weight: bold;
  color: #007bff;
}

.remove-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c82333;
}

.cart-total {
  margin-top: 1rem;
  padding: 1rem;
  border-top: 2px solid #ddd;
  text-align: right;
}

.empty-cart {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style> 