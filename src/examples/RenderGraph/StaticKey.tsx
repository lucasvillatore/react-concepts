import { useEffect, useRef, useState, type ReactNode } from 'react';
import './style.css';

interface GraphNode {
  id: string;
  label: string;
  children?: GraphNode[];
}

const initialGraphData: GraphNode[] = [
  {
    id: 'root',
    label: 'App (Root)',
    children: [
      {
        id: 'node-a',
        label: 'Filho A',
        children: [
          { id: 'node-a1', label: 'Neto A1' },
          { id: 'node-a2', label: 'Neto A2' },
        ]
      },
      {
        id: 'node-b',
        label: 'Filho B',
        children: [
          {
            id: 'node-b1',
            label: 'Neto B1',
            children: [
              { id: 'node-b1-1', label: 'Bisneto B1.1' }
            ]
          }
        ]
      }
    ]
  }
];

interface NodeProps {
  id: string;
  label: string;
  children?: ReactNode;
}

function Node({ id, label, children }: NodeProps) {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  const countSpanRef = useRef<HTMLElement>(null);

  useEffect(() => {
    renderCount.current += 1;
    if (countSpanRef.current) {
      countSpanRef.current.innerText = `Renders: ${renderCount.current}`;
    }

    const nodeElement = document.getElementById(id);
    if(nodeElement) {
      nodeElement.classList.remove('flash');
      void nodeElement.offsetWidth;
      nodeElement.classList.add('flash');
    }
  });

  return (
    <li>
      <div
        id={id}
        className="node-card"
        onClick={(e) => {
             e.stopPropagation();
             setCount(c => c + 1);
        }}
        title={`ID: ${id} - Clique para somar`}
      >
        <strong>{label}</strong>
        <div style={{ margin: '5px 0', fontSize: '1.2em', fontWeight: 'bold', color: '#1890ff' }}>
          {count}
        </div>
        <small ref={countSpanRef} style={{ color: '#999', fontSize: '0.8em' }}>
           Renders: 0
        </small>
        <br/>
        <small style={{ fontSize: '0.7em', color: '#555', background: '#eee', padding: '2px 4px', borderRadius: 4 }}>
           key="{id}"
        </small>
      </div>

      {children && <ul>{children}</ul>}
    </li>
  );
}

export default function StaticKey() {
  const [forceUpdate, setForceUpdate] = useState(0);

  const renderTree = (nodes: GraphNode[]) => {
    return nodes.map((node) => (
      <Node
        key={node.id}
        id={node.id}
        label={node.label}
      >
        {node.children ? renderTree(node.children) : null}
      </Node>
    ));
  };

  return (
    <div className="tree-container">
      <div className="tree">
        <ul>
            {renderTree(initialGraphData)}
        </ul>
      </div>

      <div style={{ position: 'fixed', bottom: 20, right: 20, background: 'white', padding: 15, border: '1px solid #ccc', borderRadius: 8 }}>
        <h4>Teste de Keys Estáveis</h4>
        <p>1. Clique nos nós para alterar os números (Estado local).</p>
        <p>2. Clique no botão abaixo para forçar um re-render do Pai.</p>
        <button onClick={() => setForceUpdate(n => n + 1)}>
          Forçar Render do Pai ({forceUpdate})
        </button>
        <p style={{color: 'green', marginTop: 10, fontWeight: 'bold'}}>
            Resultado: Os números NÃO zeram.<br/>O React reconhece que são os mesmos componentes.
        </p>
      </div>
    </div>
  );
}
