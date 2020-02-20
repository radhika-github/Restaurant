export const formatPrice = (x, currency) => {
  switch (currency) {
    case 'BRL':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};

export const productsAPI = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=New York';
// export const productsAPI = 'https://react-shopping-cart-67954.firebaseio.com/products.json';;
