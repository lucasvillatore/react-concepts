export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const mockDatabase: Todo[] = [
  { id: 1, title: 'Aprender React Query', completed: true },
  { id: 2, title: 'Entender Custom Hooks', completed: false },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = async (): Promise<Todo[]> => {
  await delay(1000);
  return [...mockDatabase];
};

export const createTodo = async (title: string): Promise<Todo> => {
  await delay(1000);
  const newTodo = { id: Date.now(), title, completed: false };
  mockDatabase.push(newTodo);
  return newTodo;
};
