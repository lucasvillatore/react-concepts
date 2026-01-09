import ProductManagerView from '../components/List/ProductManagerView';
import { useProductsQuery } from '../hooks/useProducts';

export default function ProductManagerPage() {
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
