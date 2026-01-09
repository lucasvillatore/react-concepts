import { useProductsQuery } from '../../hooks/useProducts';
import ProductManagerView from './ProductManager.view';

export default function ProductManager() {
  const {
    products,
    loading,
    error,
    filter,
    setFilter,
    isFetching,
  } = useProductsQuery();

  return (
    <ProductManagerView
      loading={loading}
      isFetching={isFetching}
      error={error}
      filter={filter}
      onFilterChange={setFilter}
      products={products}
      lastUpdate={new Date()}
    />
  );
}
