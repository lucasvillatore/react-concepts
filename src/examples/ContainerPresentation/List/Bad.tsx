import { Avatar, Card, List, Spin, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { fetchUsers, type User } from './services/user.api';

export default function UserListBad() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large" tip="Carregando (Jeito Acoplado)..." />
      </div>
    );
  }

  return (
    <Card
      title="⚠️ Lista Misturada (Monólito)"
      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
    >
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={user.avatar} />}
              title={
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  {user.name}
                  {user.role === 'admin' && <Tag color="red">Admin (Hardcoded)</Tag>}
                </div>
              }
              description={user.email}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
