import { ApiOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Badge, Card, Col, Divider, List, Row, Skeleton, Statistic, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getUserAddress, getUserProfile, type Address, type User } from './services/auth.api';
import { getExternalNotifications, type NotificationItem } from './services/integration';
import { getSalesHistory, type Sale } from './services/store';
const { Title, Text } = Typography;

const UserProfileWidget = () => {
  const [user, setUser] = useState<User | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const u = await getUserProfile();
        setUser(u);
        const a = await getUserAddress(u.cep);
        setAddress(a);
      } catch (error) {
        console.error("Erro no perfil", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <Card style={{ marginBottom: 24 }}>
        <Skeleton avatar active paragraph={{ rows: 1 }} />
      </Card>
    );
  }

  return (
    <Card style={{ marginBottom: 24 }}>
      <Card.Meta
        avatar={<Avatar size={64} style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />}
        title={user?.name}
        description={
          <div>
            <Text strong>{user?.email}</Text> <br/>
            <Text type="secondary">{address?.street} - {address?.city}</Text>
          </div>
        }
      />
    </Card>
  );
};

const SalesWidget = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSalesHistory()
      .then(setSales)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card title={<><ShopOutlined /> Faturamento (Independente)</>}  style={{ height: '100%' }}>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Row gutter={16}>
            <Col span={12}><Statistic title="Vendas" value={sales.length} /></Col>
            <Col span={12}>
              <Statistic title="Receita" value={sales.reduce((a, b) => a + b.value, 0)} precision={2} prefix="R$" />
            </Col>
          </Row>
          <Divider />
          <List
            size="small"
            dataSource={sales}
            renderItem={(item) => (
              <List.Item>
                <Text>Pedido #{item.id}</Text>
                <Text type="success">R$ {item.value.toFixed(2)}</Text>
              </List.Item>
            )}
          />
        </>
      )}
    </Card>
  );
};

const NotificationsWidget = () => {
  const [notifs, setNotifs] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getExternalNotifications()
      .then(setNotifs)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (error) return <Alert type="warning" title="Não foi possível carregar notificações." />;

  return (
    <Card
      title={<><ApiOutlined /> Notificações</>}
      style={{ height: '100%' }}
      extra={<Badge count={loading ? 0 : notifs.length} />}
    >
      {loading ? <Skeleton active paragraph={{ rows: 2 }} /> : (
        <List
          dataSource={notifs}
          renderItem={(item) => (
            <List.Item>
               <List.Item.Meta title={`Evento #${item.id}`} description={item.text} />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default function DashboardOk() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Dashboard Refatorado</Title>
        <Text type="secondary">
          Carregamento Paralelo & Componentes Autônomos.
          <br/>Observe que o Perfil aparece antes das Vendas!
        </Text>
      </div>

      <UserProfileWidget />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}><SalesWidget /></Col>
        <Col xs={24} md={12}><NotificationsWidget /></Col>
      </Row>
    </div>
  );
}
