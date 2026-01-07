import { ApiOutlined, ShopOutlined, UserOutlined, WarningOutlined } from '@ant-design/icons';
import { Alert, Avatar, Badge, Card, Col, Divider, List, Row, Spin, Statistic, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getUserAddress, getUserProfile, type Address, type User } from './services/auth.api';
import { getExternalNotifications, type NotificationItem } from './services/integration';
import { getSalesHistory, type Sale } from './services/store';

const { Title, Text } = Typography;

export default function DashboardFrankenstein() {
  const [user, setUser] = useState<User | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Um loading booleano para governar todos eles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // =========================================================
  // 2. WATERFALL REQUEST (O Efeito Cascata)
  // O usuário espera a soma de todos os tempos: 1.5s + 1s + 2s + 0.8s...
  // =========================================================
  useEffect(() => {
    async function loadFullDashboard() {
      try {
        // Passo A: Pega usuário
        const userData = await getUserProfile();
        setUser(userData);

        // Passo B: Pega endereço (depende do user)
        // Até aqui faz sentido esperar, mas trava o resto da tela
        const addressData = await getUserAddress(userData.cep);
        setAddress(addressData);

        // Passo C: Pega Vendas (Não depende do user, podia ser paralelo!)
        // Mas como está num await sequencial, ele espera o endereço carregar para começar.
        const salesData = await getSalesHistory();
        setSales(salesData);

        // Passo D: Pega Notificações (Independente também)
        const notifsData = await getExternalNotifications();
        setNotifications(notifsData);

      } catch (err) {
        // Se a API de Notificação falhar, o usuário não vê NADA (nem o perfil dele)
        console.error(err);
        setError('Falha crítica ao carregar o sistema. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    loadFullDashboard();
  }, []);

  // =========================================================
  // 3. UI MONOLÍTICA
  // Se eu quiser reutilizar o widget de vendas, não consigo.
  // =========================================================

  if (loading) {
    return (
      <div style={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" />
        <p style={{ marginTop: 20, color: '#999' }}>Carregando dados de múltiplos microsserviços sequencialmente...</p>
        <small>(Observe o console do navegador para ver a ordem)</small>
      </div>
    );
  }

  if (error) {
    return <Alert title="Erro" description={error} type="error" showIcon />;
  }

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Dashboard Executivo</Title>
        <Text type="secondary">Visão geral unificada (e acoplada)</Text>
      </div>

      <Card style={{ marginBottom: 24 }}>
        <Card.Meta
          avatar={<Avatar size={64} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />}
          title={user?.name}
          description={
            <div>
              <Text strong>{user?.email}</Text> <br/>
              <Text type="secondary">{address?.street} - {address?.city}</Text>
            </div>
          }
        />
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} lg={12}>
          <Card title={<><ShopOutlined /> Faturamento Recente</>} style={{ height: '100%' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="Total Vendas" value={sales.length} />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Receita (R$)"
                  value={sales.reduce((acc, curr) => acc + curr.value, 0)}
                  precision={2}
                  styles={{ content: { color: '#3f8600' } }}
                />
              </Col>
            </Row>
            <Divider />
            <List
              size="small"
              dataSource={sales}
              renderItem={(item) => (
                <List.Item>
                  <Text>Pedido #{item.id}</Text>
                  <Text type={item.status === 'approved' ? 'success' : 'warning'}>
                     R$ {item.value.toFixed(2)}
                  </Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={12} lg={12}>
          <Card
            title={<><ApiOutlined /> Notificações do Sistema</>}
            style={{ height: '100%' }}
            extra={<Badge count={notifications.length} />}
          >
            <List
              dataSource={notifications}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.type === 'error' ? <WarningOutlined style={{ color: 'red' }} /> : <ApiOutlined />}
                    title={`Evento #${item.id}`}
                    description={item.text}
                  />
                </List.Item>
              )}
            />
            {notifications.length === 0 && <Text type="secondary">Nenhuma notificação nova.</Text>}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
