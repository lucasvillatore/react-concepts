import { useState } from 'react';
import { fetchProducts,  } from '../services/products.api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useFetchProducts() {
  const [filter, setFilter] = useState<string>('');

  const query = useQuery({
    queryKey: ['product', filter],
    queryFn: () => fetchProducts(filter),
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });

  return {
    products: query.data || [],
    loading: query.isLoading,
    error: query.isError ? 'Erro ao carregar produtos' : '',
    filter,
    setFilter,
  }
}