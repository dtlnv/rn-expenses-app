import { DUMMY_BARCODE_DATA } from '../constants/dummy-data';

export async function fetchProductData(barcode) {
  // https://api.barcodelookup.com/v3/products?barcode=0016571951603&formatted=y&key=8ehoq4rqxzguuqfg26fui9njiv642t
  const url = `https://jsonplaceholder.typicode.com/posts/1/comments`;
  try {
    // const response = await fetch(url);
    // const data = await response.json();
    // console.log('data', data);
    return DUMMY_BARCODE_DATA;
  } catch (error) {
    return DUMMY_BARCODE_DATA;
  }
}

export function getProduct(data) {
  return {
    title: data?.products[0]?.title || 'Unknown',
    price: data?.products[0]?.stores[0]?.price || 0,
  };
}
