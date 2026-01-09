import { toggleProductPromotion  } from '../services/products.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePromoteProduct() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: toggleProductPromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });

  return {
    toggleProductPromotion: mutation.mutate,
    loading: mutation.isPending,
  }
}