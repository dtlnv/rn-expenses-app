import { DUMMY_BARCODE_DATA } from '../constants/dummy-data';

export async function fetchProductData(barcode) {
  const url = `https://api.barcodelookup.com/v3/products?barcode=${barcode}&formatted=y&key=8ehoq4rqxzguuqfg26fui9njiv642t`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
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
