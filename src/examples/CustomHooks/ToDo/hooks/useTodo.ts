import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodo, fetchTodos } from '../services/toDo.api';

const TODOS_KEY = ['todos'];

export function useTodos() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: TODOS_KEY,
    queryFn: fetchTodos,
    staleTime: 1000 * 60,
  });

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_KEY });
    },
  });

  return {
    todos: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,

    addTodo: mutation.mutate,
    isAdding: mutation.isPending,
  };
}
