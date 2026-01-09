import { Typography } from 'antd';

const { Text } = Typography;

interface Props {
  value: number;
  isLightMode?: boolean;
}

export default function PriceTag({
  value,
  isLightMode
}: Props) {

  return (
    <Text type={isLightMode ? 'warning' : 'secondary'} strong style={{ fontSize: '1.1em' }}>
      R$ {value.toFixed(2)}
    </Text>
  );
}
