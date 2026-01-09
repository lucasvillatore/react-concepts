import { ShoppingOutlined, StarOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { type ReactNode } from 'react';

interface Props {
  title: ReactNode;
  variant?: 'default' | 'promoted';
  actions?: ReactNode[];
  children: ReactNode;
}

export default function ProductCardView({
  title,
  variant = 'default',
  actions,
  children
}: Props) {

  const isPromoted = variant === 'promoted';

  const cardStyles = {
    marginBottom: 16,
    border: isPromoted ? '2px solid gold' : '1px solid #d9d9d9',
    background: isPromoted ? '#333' : '#fff',
    transition: 'all 0.3s ease'
  };

  const titleStyles = {
     color: isPromoted ? '#fff' : '#000'
  };

  const icon = isPromoted
    ? <StarOutlined style={{ fontSize: 24, color: 'gold' }} />
    : <ShoppingOutlined style={{ fontSize: 24, color: '#1890ff' }} />;

  return (
    <Card style={cardStyles} actions={actions}>
      <Card.Meta
        avatar={icon}
        title={<span style={titleStyles}>{title}</span>}
        description={children}
      />
    </Card>
  );
};
