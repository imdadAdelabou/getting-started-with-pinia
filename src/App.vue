<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";

const productStore = useProductStore();
const cartStore = useCartStore();
// const addItemToCart = (count, product) => {
//   console.log(count);
//   cartStore.$patch((state) => {
//     for (let i = 0; i < count; i++) {
//       state.items.push(product);
//     }
//   });
// };

productStore.fill();
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="(count) => cartStore.addItems(count, product)"
      />
    </ul>
  </div>
</template>
