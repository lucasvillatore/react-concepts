export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  isPromoted: boolean;
}

let MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Tênis Nike Air', price: 450, category: 'calçados', isPromoted: false },
  { id: 2, name: 'Camiseta Adidas', price: 120, category: 'roupas', isPromoted: false },
  { id: 3, name: 'Boné New Era', price: 89, category: 'acessorios', isPromoted: false },
  { id: 4, name: 'Meias Puma', price: 30, category: 'roupas', isPromoted: false },
];

const delay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProducts = async (query: string) => {
  await delay();


  console.log('aqui');
  if (query) {
    console.log('aqui 2');
    return MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }
  console.log('aqui 3');

  return [...MOCK_PRODUCTS];
};

export const toggleProductPromotion = async (id: number) => {
  await delay(500);
  MOCK_PRODUCTS = MOCK_PRODUCTS.map(p =>
    p.id === id ? { ...p, isPromoted: !p.isPromoted } : p
  );
  return true;
};

export const deleteProduct = async (id: number) => {
  await delay(500);
  MOCK_PRODUCTS = MOCK_PRODUCTS.filter(p => p.id !== id);
  return true;
};
