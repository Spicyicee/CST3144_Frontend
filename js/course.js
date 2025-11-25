var webstore = new Vue({
  el: '#app',
  data: {
    products: courses,
    cart: []
  },
  computed: {
    cartItemCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
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
    }
  }
});