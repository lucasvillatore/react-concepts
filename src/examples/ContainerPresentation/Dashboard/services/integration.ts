export interface NotificationItem {
  id: number;
  text: string;
  type: 'error' | 'warning' | 'info';
}

export const getExternalNotifications = async () => {
  return new Promise<NotificationItem[]>((resolve) => {
    console.log('🔄 Buscando notificações externas...');
    setTimeout(() => {
      console.log('✅ Notificações carregadas.');
      resolve([
        { id: 1, text: 'Pull Request #402 pendente', type: 'warning' },
        { id: 2, text: 'Deploy em Produção falhou', type: 'error' },
      ]);
    }, 800);
  });
};
