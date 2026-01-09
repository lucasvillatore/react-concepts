import { StarOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

export default function PromotedBadge() {
  return (
    <Tag color="gold" style={{ marginLeft: 8 }}>
      <StarOutlined /> Destaque
    </Tag>
  );
}
