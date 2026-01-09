import { Card, Col, Divider, Row, Typography } from 'antd';

import { ComplexImage } from './examples/ComplexImage';
import { GoldBorderImage } from './examples/GoldenImage';
import { RedBorderImage } from './examples/RedImage';
import { SimpleCaptionImage } from './examples/SimpleImageWithCaption';

const { Title, Text } = Typography;

export default function CompositionGallery() {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Galeria de Composição</Title>
      <Text type="secondary">
        4 arquivos diferentes, usando os mesmos blocos de construção (Lego),
        mas criando resultados visuais distintos.
      </Text>

      <Divider />

      <Row gutter={[24, 24]}>

        <Col xs={24} md={12}>
          <Card title="Arquivo 1: Borda Vermelha">
            <div style={{ textAlign: 'center' }}>
              <RedBorderImage />
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Arquivo 2: Borda Dourada">
            <div style={{ textAlign: 'center' }}>
              <GoldBorderImage />
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Arquivo 3: Complexa (Borda + Legenda)">
            <div style={{ textAlign: 'center' }}>
              <ComplexImage />
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Arquivo 4: Simples (Só Legenda)">
            <div style={{ textAlign: 'center' }}>
              <SimpleCaptionImage />
            </div>
          </Card>
        </Col>

      </Row>
    </div>
  );
}
