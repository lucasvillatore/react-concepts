import { Avatar, Card, List, Spin, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { fetchUsers, type User } from './services/user.api';

interface UserListUIProps {
  users: User[];
  isLoading: boolean;
}

const UserListUI = ({ users, isLoading }: UserListUIProps) => {
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large" tip="Carregando de forma elegante..." />
      </div>
    );
  }

  return (
    <Card title="✅ Lista Refatorada (Padrão Container)" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
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
                  {user.role === 'admin' && <Tag color="blue">Admin</Tag>}
                </div>
              }
              description={user.email}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default function UserListContainer() {
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

  return <UserListUI users={users} isLoading={loading} />;
}
