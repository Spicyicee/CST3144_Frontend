var webstore = new Vue({
  el: '#app',
  data: {
    showProduct: true,
    products: courses,
    cart: []
  },
  computed: {
    cartItemCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    cartTotal() {
      return this.cart.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
      }, 0);
    },
    cartItems() {
      return this.cart;
    }
  },
  methods: {
    addToCart(product) {
      if (product.spaces > 0) {
        this.cart.push({
          product: product,
          quantity: 1
        });
        product.spaces--;
      }
    },
    canAddToCart(product) {
      return product.spaces > 0;
    },
    toggleCheckout() {
      this.showProduct = !this.showProduct;
    },
    removeFromCart(item) {
      item.product.spaces += item.quantity;
      const index = this.cart.indexOf(item);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
    }
  }
});