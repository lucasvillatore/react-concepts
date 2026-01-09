import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Input, List, Spin, Typography } from 'antd';
import { useState } from 'react';
import { useTodos } from './hooks/useTodo';

const { Title } = Typography;

export default function TodoListGood() {
  const { todos, isLoading, isError, addTodo, isAdding, refetch } = useTodos();

  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    if (!newTitle.trim()) return;

    addTodo(newTitle, {
      onSuccess: () => setNewTitle('')
    });
  };

  if (isLoading) {
    return <div style={{ padding: 50, textAlign: 'center' }}><Spin size="large" tip="Buscando tarefas..." /></div>;
  }

  if (isError) {
    return <Alert type="error" title="Erro ao carregar tarefas." action={<Button onClick={() => refetch()}>Tentar novamente</Button>} />;
  }

  return (
    <Card
      title={<Title level={4}>Lista de Tarefas (Custom Hook)</Title>}
      style={{ maxWidth: 600, margin: '20px auto' }}
      extra={<Button icon={<ReloadOutlined />} onClick={() => refetch()} />}
    >
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <Input
          placeholder="Nova tarefa..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onPressEnter={handleAdd}
          disabled={isAdding}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          loading={isAdding}
        >
          Adicionar
        </Button>
      </div>

      <List
        dataSource={todos}
        bordered
        renderItem={(item) => (
          <List.Item>
            <Typography.Text delete={item.completed}>
              {item.title}
            </Typography.Text>
          </List.Item>
        )}
      />

      <div style={{ marginTop: 10, color: '#999', fontSize: 12 }}>
        Total: {todos.length} tarefas no cache.
      </div>
    </Card>
  );
}
