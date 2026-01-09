import { DeleteOutlined, ShoppingOutlined, StarOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Col, Input, Row, Spin, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import './style.css';

const { Title, Text } = Typography;

const MOCK_PRODUCTS = [
  { id: 1, name: 'Tênis Nike Air', price: 450, category: 'calçados' },
  { id: 2, name: 'Camiseta Adidas', price: 120, category: 'roupas' },
  { id: 3, name: 'Boné New Era', price: 89, category: 'acessorios' },
  { id: 4, name: 'Meias Puma', price: 30, category: 'roupas' },
];

const BadProductCard = ({
  title,
  price,
  category,
  isPromoted,
  onPromote,
  onDelete,
  showDeleteButton,
  cardStyle,
  isLoadingAction,
}: any) => {

  useEffect(() => {
      console.log(`Nasceu o card: ${title}`);
      return () => console.log(`Morreu o card: ${title}`);
  });

  return (
    <Card
      className="flash-animation-wrapper"
      style={{
        marginBottom: 16,
        border: isPromoted ? '2px solid gold' : '1px solid #d9d9d9',
        background: cardStyle === 'dark' ? '#333' : '#fff',
      }}
      actions={[
        <Button
            type="link"
            onClick={onPromote}
            loading={isLoadingAction}
            disabled={isLoadingAction}
        >
           {isPromoted ? 'Remover Destaque' : 'Promover'}
        </Button>,

        showDeleteButton && (
            <Button
                danger
                type="text"
                icon={<DeleteOutlined />}
                onClick={onDelete}
                loading={isLoadingAction}
                disabled={isLoadingAction}
            />
        )
      ]}
    >
      <Card.Meta
        avatar={<ShoppingOutlined style={{ fontSize: 24, color: isPromoted ? 'gold' : '#1890ff' }} />}
        title={<span style={{ color: cardStyle === 'dark' ? '#fff' : '#000' }}>{title}</span>}
        description={
          <div>
            <Text type={cardStyle === 'dark' ? 'warning' : 'secondary'}>R$ {price.toFixed(2)}</Text>
            <br/>
            <Tag color="blue">{category}</Tag>
            {isPromoted && <Tag color="gold"><StarOutlined /> Destaque</Tag>}
            <div style={{ fontSize: 10, color: '#ccc', marginTop: 5 }}>
               Renderizado em: {new Date().toLocaleTimeString()}
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default function ProductManagerChaos() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await new Promise(r => setTimeout(r, 1000));
        setProducts(MOCK_PRODUCTS);
      } catch (err) {
        setError('Erro ao carregar');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handlePromote = async (id: number) => {
    setActionLoadingId(id);

    await new Promise(r => setTimeout(r, 1000));

    setProducts(prev => prev.map(p =>
      p.id === id ? { ...p, isPromoted: !p.isPromoted } : p
    ));

    setLastUpdate(new Date());

    setActionLoadingId(null);
  };

  const handleDelete = async (id: number) => {
    setActionLoadingId(id);
    await new Promise(r => setTimeout(r, 1000));

    setProducts(prev => prev.filter(p => p.id !== id));
    setActionLoadingId(null);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  if (error) return <Alert title={error} type="error" />;

  return (
    <div style={{ padding: 24, background: '#f5f5f5', minHeight: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Gerenciador Caótico 🤯</Title>
        <Text type="secondary">
            Note o atraso ao clicar em "Promover" e como gerenciamos esse loading manualmente.
        </Text>
      </div>

      <div style={{ marginBottom: 24, background: '#fff', padding: 16, borderRadius: 8 }}>
         <Input.Search
            placeholder="Filtrar produtos..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            enterButton
         />
         <div style={{ marginTop: 10 }}>
            <Text type="danger">Último Render Global: {lastUpdate.toLocaleTimeString()}</Text>
         </div>
      </div>

      <Row gutter={[16, 16]}>
        {filteredProducts.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6}
            key={Math.random()}
          >
            <BadProductCard
              title={product.name}
              price={product.price}
              category={product.category}
              isPromoted={product.isPromoted}
              onPromote={() => handlePromote(product.id)}
              onDelete={() => handleDelete(product.id)}
              showDeleteButton={true}
              cardStyle={product.isPromoted ? 'dark' : {}}
              isLoadingAction={actionLoadingId === product.id}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
