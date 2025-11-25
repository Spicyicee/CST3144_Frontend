var webstore = new Vue({
  el: '#app',
  data: {
    showProduct: true,
    order: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      method: '',
      gift: false
    },
    states: {
      AL: 'Alabama',
      AK: 'Alaska',
      AZ: 'Arizona',
      AR: 'Arkansas',
      CA: 'California',
      CO: 'Colorado',
      CT: 'Connecticut',
      DE: 'Delaware',
      FL: 'Florida',
      GA: 'Georgia',
      HI: 'Hawaii',
      ID: 'Idaho',
      IL: 'Illinois',
      IN: 'Indiana',
      IA: 'Iowa',
      KS: 'Kansas',
      KY: 'Kentucky',
      LA: 'Louisiana',
      ME: 'Maine',
      MD: 'Maryland',
      MA: 'Massachusetts',
      MI: 'Michigan',
      MN: 'Minnesota',
      MS: 'Mississippi',
      MO: 'Missouri',
      MT: 'Montana',
      NE: 'Nebraska',
      NV: 'Nevada',
      NH: 'New Hampshire',
      NJ: 'New Jersey',
      NM: 'New Mexico',
      NY: 'New York',
      NC: 'North Carolina',
      ND: 'North Dakota',
      OH: 'Ohio',
      OK: 'Oklahoma',
      OR: 'Oregon',
      PA: 'Pennsylvania',
      RI: 'Rhode Island',
      SC: 'South Carolina',
      SD: 'South Dakota',
      TN: 'Tennessee',
      TX: 'Texas',
      UT: 'Utah',
      VT: 'Vermont',
      VA: 'Virginia',
      WA: 'Washington',
      WV: 'West Virginia',
      WI: 'Wisconsin',
      WY: 'Wyoming'
    },
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
    },
    submitForm() {
      alert('Order submitted successfully!');
      this.order = {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        method: '',
        gift: false
      };
      this.cart = [];
      this.showProduct = true;
    }
  }
});