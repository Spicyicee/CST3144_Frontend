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
    formErrors: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      method: ''
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
    cart: [],
    sortBy: 'subject',
    sortOrder: 'ascending',
    searchQuery: ''
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
    },
    filteredProducts() {
      let filtered = this.products;
      
      // Apply search filter
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(product => {
          return product.subject.toLowerCase().includes(query) || 
                 product.location.toLowerCase().includes(query);
        });
      }
      
      // Apply sorting
      filtered = filtered.slice().sort((a, b) => {
        let comparison = 0;
        
        if (this.sortBy === 'subject') {
          comparison = a.subject.localeCompare(b.subject);
        } else if (this.sortBy === 'location') {
          comparison = a.location.localeCompare(b.location);
        } else if (this.sortBy === 'price') {
          comparison = a.price - b.price;
        } else if (this.sortBy === 'spaces') {
          comparison = a.spaces - b.spaces;
        }
        
        return this.sortOrder === 'ascending' ? comparison : -comparison;
      });
      
      return filtered;
    }
  },
  methods: {
   addToCart(product) {
  if (product.spaces > 0) {

    // Always add a NEW separate item to the cart
    this.cart.push({
      product: product,
      quantity: 1
    });

    // Decrease available spaces
    product.spaces--;
  }
}
,
    canAddToCart(product) {
      return product.spaces > 0;
    },
    toggleCheckout() {
      this.showProduct = !this.showProduct;
      // Clear form errors when switching views
      this.clearFormErrors();
    },
    validateForm() {
      // Clear previous errors
      this.clearFormErrors();
      
      let isValid = true;
      
      // Validate First Name
      if (!this.order.firstName || this.order.firstName.trim() === '') {
        this.formErrors.firstName = 'First name is required';
        isValid = false;
      }
      
      // Validate Last Name
      if (!this.order.lastName || this.order.lastName.trim() === '') {
        this.formErrors.lastName = 'Last name is required';
        isValid = false;
      }
      
      // Validate Address
      if (!this.order.address || this.order.address.trim() === '') {
        this.formErrors.address = 'Address is required';
        isValid = false;
      }
      
      // Validate City
      if (!this.order.city || this.order.city.trim() === '') {
        this.formErrors.city = 'City is required';
        isValid = false;
      }
      
      // Validate State
      if (!this.order.state || this.order.state === '') {
        this.formErrors.state = 'State is required';
        isValid = false;
      }
      
      // Validate Zip
      if (!this.order.zip || this.order.zip.trim() === '') {
        this.formErrors.zip = 'Zip/Postal code is required';
        isValid = false;
      }
      
      // Validate Delivery Method
      if (!this.order.method || this.order.method === '') {
        this.formErrors.method = 'Delivery method is required';
        isValid = false;
      }
      
      return isValid;
    },
    clearFormErrors() {
      this.formErrors = {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        method: ''
      };
    },
    removeFromCart(item) {
      // Return spaces to product
      item.product.spaces += item.quantity;
      
      // Remove item from cart
      const index = this.cart.indexOf(item);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
    },
    submitForm() {
      if (this.validateForm()) {
        alert('Order submitted successfully!');
        // Reset form and cart
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
      } else {
        alert('Please fill in all required fields.');
      }
    }
  }
});