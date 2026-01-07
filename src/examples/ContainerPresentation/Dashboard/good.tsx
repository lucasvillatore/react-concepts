import { ApiOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Badge, Card, Col, Divider, List, Row, Skeleton, Statistic, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { getUserAddress, getUserProfile } from './services/auth.api';
import { getExternalNotifications, type NotificationItem } from './services/integration';
import { getSalesHistory, type Sale } from './services/store';
import type { UserProfileViewModel } from './services/user.api';

const { Title, Text } = Typography;

interface UserProfileViewProps {
  userName?: string;
  userEmail?: string;
  fullAddress?: string;
  loading: boolean;
  error: boolean;
}

const UserProfileView = ({ userName, userEmail, fullAddress, loading, error }: UserProfileViewProps) => {
  if (loading) return <Card style={{ marginBottom: 24 }}><Skeleton avatar active paragraph={{ rows: 1 }} /></Card>;
  if (error) return <Alert type="warning" title="Erro ao carregar perfil" style={{ marginBottom: 24 }} showIcon />;

  return (
    <Card style={{ marginBottom: 24 }} >
      <Card.Meta
        avatar={<Avatar size={64} style={{ backgroundColor: '#722ed1' }} icon={<UserOutlined />} />}
        title={userName}
        description={
          <div>
            <Text strong>{userEmail}</Text> <br/>
            <Text type="secondary">{fullAddress}</Text>
          </div>
        }
      />
    </Card>
  );
};

interface SalesViewProps {
  sales: Sale[];
  totalRevenue: number;
  loading: boolean;
}

const SalesView = ({ sales, totalRevenue, loading }: SalesViewProps) => {
  return (
    <Card title={<><ShopOutlined /> Faturamento (Typed)</>} style={{ height: '100%' }}>
      {loading ? <Skeleton active /> : (
        <>
          <Row gutter={16}>
            <Col span={12}><Statistic title="Vendas" value={sales.length} /></Col>
            <Col span={12}>
              <Statistic title="Receita" value={totalRevenue} precision={2} prefix="R$" styles={{ content: {color: '#3f8600'} }} />
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

interface NotificationsViewProps {
  notifications: NotificationItem[];
  loading: boolean;
  hasError: boolean;
}

const NotificationsView = ({ notifications, loading, hasError }: NotificationsViewProps) => {
  if (hasError) return <Alert type="error" title="Falha no Widget" />;

  return (
    <Card
      title={<><ApiOutlined /> Notificações (Typed)</>}
      style={{ height: '100%' }}
      extra={<Badge count={loading ? 0 : notifications.length} showZero color="blue" />}
    >
      {loading ? <Skeleton active paragraph={{ rows: 2 }} /> : (
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item>
               <List.Item.Meta
                  avatar={<ApiOutlined style={{ color: item.type === 'error' ? 'red' : 'blue' }} />}
                  title={`Evento #${item.id}`}
                  description={item.text}
               />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

const UserProfileContainer = () => {
  const [data, setData] = useState<UserProfileViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const user = await getUserProfile();
        let addressStr = "Endereço não localizado";

        if (user.cep) {
          const addr = await getUserAddress(user.cep);
          addressStr = `${addr.street} - ${addr.city}`;
        }

        setData({
            name: user.name,
            email: user.email,
            addressStr
        });
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <UserProfileView
      userName={data?.name}
      userEmail={data?.email}
      fullAddress={data?.addressStr}
      loading={loading}
      error={error}
    />
  );
};

const SalesContainer = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSalesHistory()
      .then((data) => {
        if (Array.isArray(data)) {
           setSales(data as Sale[]);
        }
      })
      .catch(() => setSales([]))
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = useMemo(() => {
    return sales.reduce((acc, curr) => acc + (curr.value || 0), 0);
  }, [sales]);

  return <SalesView sales={sales} totalRevenue={totalRevenue} loading={loading} />;
};

const NotificationsContainer = () => {
  const [notifs, setNotifs] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getExternalNotifications()
      .then((data) => setNotifs(data as NotificationItem[]))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return <NotificationsView notifications={notifs} loading={loading} hasError={error} />;
};


export default function DashboardGood() {
  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Dashboard Arquitetura Limpa (TS)</Title>
        <Text type="secondary">
          Zero "any", Tipagem Estrita e Separação de Responsabilidades.
        </Text>
      </div>

      <UserProfileContainer />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}><SalesContainer /></Col>
        <Col xs={24} md={12}><NotificationsContainer /></Col>
      </Row>
    </div>
  );
}
