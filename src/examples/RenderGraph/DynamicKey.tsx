import { useEffect, useRef, useState, type ReactNode } from 'react';
import './style.css'; // Assume o mesmo CSS do exemplo anterior

// 1. Estrutura de dados COMPLETA (igual ao exemplo estável)
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

// --- COMPONENTE NODE ---
// Visualmente idêntico ao estável, mas adaptado para mostrar a key dinâmica
interface NodeProps {
  label: string;
  children?: ReactNode;
  displayKey: string; // Para mostrar na tela qual key o React está vendo
}

function Node({ label, children, displayKey }: NodeProps) {
  const [count, setCount] = useState(0);
  const countSpanRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = document.getElementById(`node-visual-${displayKey}`);
    if (element) {
        element.classList.add('flash');
        setTimeout(() => element.classList.remove('flash'), 500);
    }
  }, [displayKey]);

  return (
    <li>
      <div
        id={`node-visual-${displayKey}`}
        className="node-card"
        // Borda pontilhada vermelha para diferenciar visualmente do exemplo "Bom"
        style={{ border: '2px dashed #ff4d4f' }}
        onClick={(e) => {
            e.stopPropagation();
            setCount(c => c + 1);
        }}
        title="Clique para aumentar o contador"
      >
        <strong>{label}</strong>

        <div style={{ margin: '5px 0', fontSize: '1.2em', fontWeight: 'bold', color: '#ff4d4f' }}>
          {count}
        </div>

        <small style={{ color: '#999', fontSize: '0.8em' }}>
           Renders: 1 (Sempre 1, pois ele recria)
        </small>
        <br/>

        {/* Mostra a Key atual para provar que mudou */}
        <small style={{
            fontSize: '0.65em',
            color: '#fff',
            background: '#ff4d4f',
            padding: '2px 4px',
            borderRadius: 4,
            display: 'inline-block',
            marginTop: 4
        }}>
           key="{displayKey.slice(0, 15)}..."
        </small>
      </div>

      {children && <ul>{children}</ul>}
    </li>
  );
}

export default function GraphDynamicKeys() {
  const [generation, setGeneration] = useState(0);

  const renderTree = (nodes: GraphNode[]) => {
    return nodes.map((node) => {
        const dynamicKey = `${node.id}-${crypto.randomUUID()}`;

        return (
          <Node
            key={dynamicKey}
            displayKey={dynamicKey}
            label={node.label}
          >
            {node.children ? renderTree(node.children) : null}
          </Node>
        );
    });
  };

  return (
    <div className="tree-container">
      <div className="tree">
        <ul>{renderTree(initialGraphData)}</ul>
      </div>

      <div style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: '#fff1f0',
          padding: 15,
          border: '1px solid #ffa39e',
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h4 style={{color: '#cf1322', margin: '0 0 10px 0'}}>
            ⚠️ Teste de Keys Aleatórias
        </h4>
        <p style={{fontSize: '0.9em'}}>1. Clique nos nós para aumentar o contador (funciona localmente).</p>
        <p style={{fontSize: '0.9em'}}>2. Agora clique no botão abaixo para re-renderizar o pai.</p>

        <button
            onClick={() => setGeneration(g => g + 1)}
            style={{
                background: '#ff4d4f',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: 4,
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: 8
            }}
        >
          Forçar Render Global (Geração {generation})
        </button>

        <p style={{color: '#cf1322', marginTop: 10, fontWeight: 'bold', fontSize: '0.9em'}}>
            Resultado: Os contadores zeram!<br/>
            Motivo: Key mudou = Componente destruído e recriado.
        </p>
      </div>
    </div>
  );
}
