import { deleteProduct } from '../services/products.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: deleteProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['product'] });
      },
    });
}