import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Input, List, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { createTodo, fetchTodos, type Todo } from './services/toDo.api';
const { Title } = Typography;

export default function TodoListManualBad() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const loadTodos = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;

    setIsSubmitting(true);

    try {
      await createTodo(newTitle);

      setNewTitle('');
      await loadTodos();
    } catch (err) {
      alert('Erro ao criar tarefa');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div style={{ padding: 50, textAlign: 'center' }}><Spin size="large" tip="Carregando na força bruta..." /></div>;
  }

  if (isError) {
    return <Alert type="error" title="Erro manual." description="Deu erro no try/catch." action={<Button onClick={loadTodos}>Tentar de novo</Button>} />;
  }

  return (
    <Card
      title={<Title level={4}>Lista Manual (O Jeito Sofrido)</Title>}
      style={{ maxWidth: 600, margin: '20px auto', border: '2px dashed orange' }}
      extra={<Button icon={<ReloadOutlined />} onClick={loadTodos} />}
    >
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <Input
          placeholder="Nova tarefa..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onPressEnter={handleAdd}
          disabled={isSubmitting}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          loading={isSubmitting}
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
        Total: {todos.length} itens (Estado Local).
      </div>
    </Card>
  );
}
