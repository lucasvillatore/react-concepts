import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleProductPromotion } from '../services/products.api';

export const usePromoteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleProductPromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
