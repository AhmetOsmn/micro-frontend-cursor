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
          <div class="quantity-controls">
            <button 
              @click="updateQuantity(item.id, item.quantity - 1)"
              :disabled="item.quantity <= 1"
              class="quantity-button"
            >
              -
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button 
              @click="updateQuantity(item.id, item.quantity + 1)"
              class="quantity-button"
            >
              +
            </button>
          </div>
          <button @click="showRemoveConfirmation(item)" class="remove-button">
            Kaldır
          </button>
        </div>
        <div class="cart-total">
          <h3>Toplam: {{ formatPrice(cart.total) }} ₺</h3>
        </div>
      </div>
    </div>
    <ConfirmModal
      :show="showModal"
      title="Ürünü Kaldır"
      :message="modalMessage"
      @confirm="handleConfirmRemove"
      @cancel="handleCancelRemove"
    />
    <ToastContainer />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import ConfirmModal from './components/ConfirmModal.vue';

interface CartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  total: number;
}

export default defineComponent({
  name: 'CartApp',
  components: {
    ConfirmModal
  },
  setup() {
    const cart = ref<Cart>({ items: [], total: 0 });
    const loading = ref(true);
    const error = ref<string | null>(null);
    const toast = useToast();
    const showModal = ref(false);
    const modalMessage = ref('');
    const selectedItem = ref<CartItem | null>(null);

    const showRemoveConfirmation = (item: CartItem) => {
      selectedItem.value = item;
      modalMessage.value = `${item.name} ürününü sepetten kaldırmak istediğinize emin misiniz?`;
      showModal.value = true;
    };

    const handleConfirmRemove = async () => {
      if (selectedItem.value) {
        await removeFromCart(selectedItem.value.id);
      }
      showModal.value = false;
      selectedItem.value = null;
    };

    const handleCancelRemove = () => {
      showModal.value = false;
      selectedItem.value = null;
    };

    const removeFromCart = async (productId: number) => {
      try {
        const cartResponse = await fetch('http://localhost:3004/cart');
        const cartData = await cartResponse.json();
        
        const newItems = cartData.items.filter((item: any) => item.id !== productId);
        const total = newItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

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

        // Sepeti yeniden yükle
        await fetchCart();

        window.dispatchEvent(
          new CustomEvent('cartUpdate', { 
            detail: { items: newItems, total }
          })
        );

        toast.success('Ürün sepetten kaldırıldı', {
          timeout: 2000,
          position: "top-right",
        });
      } catch (err) {
        console.error('Sepetten çıkarılırken hata:', err);
        toast.error('Ürün sepetten çıkarılırken bir hata oluştu', {
          timeout: 3000,
          position: "top-right",
        });
      }
    };

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

    const updateQuantity = async (productId: number, newQuantity: number) => {
      try {
        if (newQuantity < 1) {
          return removeFromCart(productId);
        }

        const cartResponse = await fetch('http://localhost:3004/cart');
        const cartData = await cartResponse.json();
        
        const newItems = cartData.items.map((item: any) => {
          if (item.id === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });

        const total = newItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

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

        // Sepeti yeniden yükle
        await fetchCart();

        window.dispatchEvent(
          new CustomEvent('cartUpdate', { 
            detail: { items: newItems, total }
          })
        );

        toast.success('Ürün miktarı güncellendi', {
          timeout: 2000,
          position: "top-right",
        });
      } catch (err) {
        console.error('Miktar güncellenirken hata:', err);
        toast.error('Ürün miktarı güncellenirken bir hata oluştu', {
          timeout: 3000,
          position: "top-right",
        });
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
      showModal,
      modalMessage,
      removeFromCart,
      updateQuantity,
      formatPrice,
      showRemoveConfirmation,
      handleConfirmRemove,
      handleCancelRemove
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

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
}

.quantity-button {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.quantity-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  min-width: 2rem;
  text-align: center;
}
</style> 