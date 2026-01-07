import type { TabsProps } from 'antd';
import { ConfigProvider, Tabs } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import CompositionGallery from './examples/Composition/Gallery';
import DashboardFrankenstein from './examples/ContainerPresentation/Dashboard/Bad';
import DashboardGood from './examples/ContainerPresentation/Dashboard/Good';
import DashboardOk from './examples/ContainerPresentation/Dashboard/Ok';
import UserListBad from './examples/ContainerPresentation/List/Bad';
import UserListContainer from './examples/ContainerPresentation/List/Good';
import RenderGraphWithUpdate from './examples/RenderGraph/Multiple';
import RenderGraph from './examples/RenderGraph/Single';

function App() {

  const renderGraphFiles: TabsProps['items'] = [
    { key: 'file-single', label: 'Básico (Single)', children: <RenderGraph /> },
    { key: 'file-multiple', label: 'Com Propagação (Multiple)', children: <RenderGraphWithUpdate /> },
  ];

  const containerPatternFiles: TabsProps['items'] = [
    { key: 'bad-code', label: 'Monólito Simples', children: <UserListBad /> },
    { key: 'good-code', label: 'Container Simples', children: <UserListContainer /> },
  ];

  const dashboardChallengeFiles: TabsProps['items'] = [
    {
      key: 'frankestein',
      label: 'Frankenstein (Waterfall)',
      children: <DashboardFrankenstein />,
    },
    {
      key: 'ok',
      label: 'Refatorado (Paralelo)',
      children: <DashboardOk />,
    },
    {
      key: 'good',
      label: 'Refatorado (Paralelo + Separação de Containers)',
      children: <DashboardGood />,
    },
  ];

  const compositionFiles: TabsProps['items'] = [
    {
      key: 'composition',
      label: 'Composition',
      children: <CompositionGallery />,
    },
  ];

  const mainTabs: TabsProps['items'] = [
    {
      key: 'folder-rendergraph',
      label: '📁 Mod 1: Renderização',
      children: (
        <div style={{ padding: 20, border: '1px solid #f0f0f0', background: '#fafafa' }}>
          <Tabs defaultActiveKey="file-single" items={renderGraphFiles} type="line" />
        </div>
      ),
    },
    {
      key: 'folder-patterns',
      label: '📁 Mod 2: Container Pattern',
      children: (
        <div style={{ padding: 20, border: '1px solid #f0f0f0', background: '#fafafa' }}>
           <h3>Exemplo 1: Lista de Usuários (Básico)</h3>
           <Tabs defaultActiveKey="bad-code" items={containerPatternFiles} type="line" />
        </div>
      ),
    },
    {
      key: 'folder-dashboard',
      label: '📁 Mod 3: Container Pattern + Waterfall',
      children: (
        <div style={{ padding: 20, border: '1px solid #f0f0f0', background: '#fafafa' }}>
           <h3>Exemplo 2: O Problema do Waterfall</h3>
           <p>Abra o console do navegador (F12) para ver a ordem de carregamento.</p>
           <Tabs defaultActiveKey="frankestein" items={dashboardChallengeFiles} type="line" />
        </div>
      ),
    },
    {
      key: 'folder-composition',
      label: '📁 Mod 4: Composition',
      children: (
        <div style={{ padding: 20, border: '1px solid #f0f0f0', background: '#fafafa' }}>
           <h3>Exemplo 4: Composição de Componentes</h3>
           <Tabs defaultActiveKey="composition" items={compositionFiles} type="line" />
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider locale={ptBR}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '20px' }}>
        <h1 style={{ marginBottom: '20px'}}>Arquitetura React Básico ao Avançado</h1>
        <Tabs defaultActiveKey="folder-rendergraph" items={mainTabs} type="card" size="large" />
      </div>
    </ConfigProvider>
  );
}

export default App;
