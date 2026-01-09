import { Tag } from 'antd';

interface Props {
  label: string;
}

export default function CategoryTag({ label }: Props) {
  return (
    <Tag color="blue" style={{ textTransform: 'capitalize' }}>
      {label}
    </Tag>
  )
}
