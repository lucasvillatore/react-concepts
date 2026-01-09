import { Alert, Col, Input, Row, Spin } from "antd";
import { Typography } from "antd";
import type { Product } from "../services/products.api";
import { ProductCard } from "./ProductCard";

const { Title, Text } = Typography;


interface Props {
  loading: boolean,
  error: string,
  products: Product[],
  filter: string,
  setFilter: (filter: string) => void,
  lastUpdate: Date
}

export default function ProductManagerView({
  loading,
  error,
  products,
  filter = '',
  setFilter,
  lastUpdate
}: Props) {
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
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6}
            key={product.id}
          >
            <ProductCard
              product={product}
            />
          </Col>
        ))}
      </Row>
    </div>
  );

}