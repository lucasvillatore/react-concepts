import { Alert, Col, Input, Row, Spin, Typography } from "antd";
import type { Product } from "../../services/products.api";
import ProductCardContainer from "../Card/ProductCardContainer";

const { Title, Text } = Typography;

interface ProductManagerViewProps {
  loading: boolean;
  error: string;
  filter: string;
  onFilterChange: (val: string) => void;
  products: Product[]
  lastUpdate: Date;
  isFetching?: boolean;
}

export default function ProductManagerView({
  loading,
  isFetching,
  error,
  filter,
  onFilterChange,
  products,
  lastUpdate
}: ProductManagerViewProps){

  if (loading && products.length === 0) {
      return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
  }

  if (error) return <Alert message={error} type="error" />;

  const isUpdating = loading || isFetching;

  return (
    <div style={{ padding: 24, background: '#f5f5f5', minHeight: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Gerenciador Refatorado 🏗️</Title>
        <Text type="secondary">Lista mantém dados antigos enquanto busca.</Text>
      </div>

      <div style={{ marginBottom: 24, background: '#fff', padding: 16, borderRadius: 8 }}>
         <Input.Search
          placeholder="Filtrar produtos..."
          value={filter}
          onChange={e => onFilterChange(e.target.value)}
          enterButton
          loading={isUpdating}
         />
         <div style={{ marginTop: 10 }}>
            <Text type="secondary">Renderizado em: {lastUpdate.toLocaleTimeString()}</Text>
         </div>
      </div>

      <div style={{
          opacity: isUpdating ? 0.5 : 1,
          transition: 'opacity 0.2s ease-in-out',
          pointerEvents: isUpdating ? 'none' : 'auto'
      }}>
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <ProductCardContainer product={product} />
            </Col>
          ))}

          {products.length === 0 && !loading && (
             <div style={{ width: '100%', textAlign: 'center', padding: 40, color: '#999' }}>
                Nenhum produto encontrado.
             </div>
          )}
        </Row>
      </div>
    </div>
  );
};
