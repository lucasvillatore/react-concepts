export interface Sale {
  id: number;
  value: number;
  status: 'approved' | 'pending' | 'rejected';
}


export const getSalesHistory = async () => {
  return new Promise<Sale[]>((resolve) => {
    console.log('🔄 Calculando histórico de vendas...');
    setTimeout(() => {
      console.log('✅ Vendas carregadas.');
      resolve([
        { id: 101, value: 4500.00, status: 'approved' },
        { id: 102, value: 120.50, status: 'pending' },
        { id: 103, value: 9000.00, status: 'approved' },
      ]);
    }, 2000);
  });
};
