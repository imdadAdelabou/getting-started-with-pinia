import { defineStore } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore";

export const useCartStore = defineStore("cartStore", {
  state: () => {
    return { items: [] };
  },
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => {
      const grouped = groupBy(state.items, (item) => item.name);
      const sorted = Object.keys(grouped).sort();
      let inOrder = {};

      console.log("Sorted =>>>", sorted);
      sorted.forEach((key) => (inOrder[key] = grouped[key]));
      console.log("In order", inOrder);
      return inOrder;
    },
    totalPrice() {
      let sum = 0;
      this.items.forEach((item) => (sum += item.price));

      return sum;
    },
  },
  actions: {
    addItems(count, product) {
      for (let i = 0; i < count; i++) {
        this.items.push({ ...product });
      }
    },

    removeItem(name) {
      this.items = this.items.filter((item) => item.name !== name);
    },

    setItemCount(product, count) {
      this.removeItem(product.name);
      this.addItems(count, product);
    },

    checkout() {
      const authUserStore = useAuthUserStore();
      alert(
        `${authUserStore.username} just bought ${this.count} items at a total of ${this.totalPrice}`
      );
    },
  },
});
