
export interface User {
  id: number;
  name: string;
  email: string;
  cep: string;
}

export interface Address {
  street: string;
  city: string;
}

export const getUserProfile = async () => {
  return new Promise<User>((resolve) => {
    console.log('🔄 Iniciando fetch de Usuário...');
    setTimeout(() => {
      console.log('✅ Usuário carregado.');
      resolve({
        id: 99,
        name: 'Gerente Frankestein',
        email: 'chefe@empresa.com',
        cep: '01310-100'
      });
    }, 1500);
  });
};

export const getUserAddress = async (cep: string) => {
  return new Promise<Address>((resolve) => {
    console.log('🔄 Buscando endereço pelo CEP ' + cep);
    setTimeout(() => {
      console.log('✅ Endereço carregado.');
      resolve({
        street: 'Avenida Paulista, 1000',
        city: 'São Paulo - SP'
      });
    }, 1000);
  });
};
