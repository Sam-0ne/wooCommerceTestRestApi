const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'https://cena.reset.cwi.com.br/index.php/wp-json/wc/v3',
    specPattern: 'cypress/api/**/*.{js,jsx,ts,tsx}',
    watchForFileChanges: false,
    env: {
      wooCommerce: 'https://cena.reset.cwi.com.br/index.php/wp-json/wc/v3',
      products: '/products',
      productReviews: '/products/reviews',
      coupons: '/coupons'
    }
  },
})
