import './style.css';
import { useFetchProducts } from './hooks/useFetchProducts';
import ProductManagerView from './components/ProductManagerView';


export default function ProductManagerChaos() {
  const {
    products,
    error,
    filter,
    loading,
    setFilter,
  } = useFetchProducts();


  return (
    <ProductManagerView
      products={products}
      error={error}
      loading={loading}
      filter={filter}
      setFilter={setFilter}
      lastUpdate={new Date()}
    />
  );
}
