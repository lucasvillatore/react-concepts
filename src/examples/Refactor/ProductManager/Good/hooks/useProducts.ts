import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchProducts } from '../services/products.api';
import { productKeys } from './queryKeys';

export const useProductsQuery = () => {
  const [filter, setFilter] = useState('');

  const {
    data: products = [],
    isLoading,
    isError,
    isFetching
  } = useQuery({
    queryKey: productKeys.list(filter),
    queryFn: () => fetchProducts(filter),
    staleTime: 1000 * 60,
    placeholderData: keepPreviousData,
  });

  return {
    products,
    isFetching,
    loading: isLoading,
    error: isError ? 'Erro ao carregar produtos' : '',
    filter,
    setFilter,
  };
};
