
export interface UserProfileViewModel {
  name: string;
  email: string;
  addressStr: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
}

const mockUsers: User[] = [
  { id: 1, name: 'Ana Silva', email: 'ana@empresa.com', role: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana' },
  { id: 2, name: 'Roberto Carlos', email: 'beto@empresa.com', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto' },
  { id: 3, name: 'Carla Dias', email: 'carla@empresa.com', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carla' },
];

export const fetchUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 1500);
  });
};
