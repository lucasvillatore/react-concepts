import { DeleteOutlined, ShoppingOutlined, StarOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Col, Input, Row, Spin, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import './style.css';

const { Title, Text } = Typography;

// --- MOCK DE DADOS (Simulando API) ---
const MOCK_PRODUCTS = [
  { id: 1, name: 'Tênis Nike Air', price: 450, category: 'calçados' },
  { id: 2, name: 'Camiseta Adidas', price: 120, category: 'roupas' },
  { id: 3, name: 'Boné New Era', price: 89, category: 'acessorios' },
  { id: 4, name: 'Meias Puma', price: 30, category: 'roupas' },
];

// ❌ PROBLEMA 4: NO COMPOSITION (Herança/Configuração Excessiva)
// Um componente que tenta fazer tudo via props booleanas e configurações.
// Se eu quiser adicionar uma imagem amanhã, tenho que editar esse componente e adicionar mais props.
const BadProductCard = ({
  title,
  price,
  category,
  isPromoted,
  onPromote,
  onDelete,
  showDeleteButton,
  cardStyle // Tentando estilizar via prop
}: any) => {

  // Lógica de piscar para evidenciar o re-render (Culpa da Key Dinâmica)
  return (
    <Card
      className="flash-animation-wrapper"
      style={{
        marginBottom: 16,
        border: isPromoted ? '2px solid gold' : '1px solid #d9d9d9',
        background: cardStyle === 'dark' ? '#333' : '#fff', // Lógica visual hardcoded
      }}
      actions={[
        <Button type="link" onClick={onPromote}>
           {isPromoted ? 'Remover Destaque' : 'Promover'}
        </Button>,
        showDeleteButton && <Button danger type="text" icon={<DeleteOutlined />} onClick={onDelete} />
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

// =================================================================
// O COMPONENTE CAÓTICO (GOD COMPONENT)
// =================================================================
export default function ProductManagerChaos() {
  // ❌ PROBLEMA 3: NO CUSTOM HOOKS (Estado Inchado)
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  // Estado que força re-render global (só pra provar o bug da key)
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // ❌ PROBLEMA 2: NO CONTAINER/PRESENTATION
  // A lógica de busca está misturada com a UI
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        // Simula delay de rede
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

  // Lógica de Mutate misturada (Promover produto)
  const handlePromote = (id: number) => {
    setProducts(prev => prev.map(p =>
      p.id === id ? { ...p, isPromoted: !p.isPromoted } : p
    ));
    setLastUpdate(new Date()); // Força update do pai
  };

  const handleDelete = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Lógica de Filtro misturada no render
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  if (error) return <Alert title={error} type="error" />;

  return (
    <div style={{ padding: 24, background: '#f5f5f5', minHeight: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Gerenciador Caótico 🤯</Title>
        <Text type="secondary">Tente digitar no filtro ou clicar em promover. Veja tudo piscando.</Text>
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
            // ❌ PROBLEMA 1: DYNAMIC KEY
            // Isso faz o componente ser destruído e recriado a cada digitação no filtro ou clique
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
              cardStyle={product.isPromoted ? 'dark' : {}} // Passando estilo via prop (ruim)
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
