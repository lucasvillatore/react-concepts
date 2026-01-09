import { DeleteOutlined, ShoppingOutlined, StarOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";

import { Typography, Tag } from "antd";

const { Text } = Typography;

interface Props {
  title: string;
  price: number;
  category: string;
  isPromoted: boolean;
  onPromote: () => void;
  onDelete: () => void;
  showDeleteButton: boolean;
  isPromoting: boolean;
}

export default function ProductCardView({
  title,
  price,
  category,
  isPromoted,
  onPromote,
  onDelete,
  showDeleteButton,
  isPromoting,
}: Props) {
  return (
    <Card
      className="flash-animation-wrapper"
      style={{
        background: isPromoted ? '#000' : '#fff',
      }}
      actions={[
        <Button type="link" onClick={onPromote} loading={isPromoting}>
          {isPromoted ? 'Remover Destaque' : 'Promover'}
        </Button>,
        showDeleteButton && <Button danger type="text" icon={<DeleteOutlined />} onClick={onDelete} />
      ]}
    >
      <Card.Meta
        avatar={<ShoppingOutlined style={{ fontSize: 24, color: isPromoted ? 'gold' : '#1890ff' }} />}
        title={<span style={{ color: isPromoted ? '#fff' : '#000' }}>{title}</span>}
        description={
          <div>
            <Text type={isPromoted ? 'warning' : 'secondary'}>R$ {price.toFixed(2)}</Text>
            <br />
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