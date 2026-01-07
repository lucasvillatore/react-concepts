import { useEffect, useRef, useState, type ReactNode } from 'react';
import './style.css';

interface NodeProps {
  label: string;
  children?: ReactNode;
  initialValue?: number;
}

function Node({ label, children, initialValue = 0 }: NodeProps) {
  const [count, setCount] = useState(initialValue);

  const renderCount = useRef(0);
  const countSpanRef = useRef<HTMLElement>(null);

  useEffect(() => {
     renderCount.current += 1;

     if (countSpanRef.current) {
         countSpanRef.current.innerText = `Renders: ${renderCount.current}`;
     }

     const nodeElement = document.getElementById(`node-${label}`);

     if(nodeElement) {
         nodeElement.classList.remove('flash');
         void nodeElement.offsetWidth;
         nodeElement.classList.add('flash');
     }
  });

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  return (
    <li>
      <div
        id={`node-${label}`}
        className="node-card"
        onClick={handleClick}
        title="Clique para atualizar o estado deste componente"
      >
        <strong>{label}</strong>
        <div style={{ margin: '5px 0', fontSize: '1.2em', fontWeight: 'bold', color: '#1890ff' }}>
          {count}
        </div>

        <small
            ref={countSpanRef}
            style={{ color: '#999', fontSize: '0.8em' }}
        >
            Renders: 0
        </small>
      </div>

      {children && (
        <ul>
          {children}
        </ul>
      )}
    </li>
  );
}

export default function RenderGraph() {
  return (
    <div className="tree-container">
      <div className="tree">
        <ul>
          <Node label="App (Root)">

            <Node label="Filho A">
              <Node label="Neto A1" />
              <Node label="Neto A2" />
            </Node>

            <Node label="Filho B">
               <Node label="Neto B1">
                  <Node label="Bisneto B1.1" />
               </Node>
            </Node>

          </Node>
        </ul>
      </div>

      <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        background: 'white',
        padding: 15,
        border: '1px solid #ccc',
        borderRadius: 8,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h4>Como testar:</h4>
        <p style={{ margin: 0, fontSize: '0.9em' }}>
          Clique em qualquer caixinha.<br/>
          Note que ela pisca (renderiza)
        </p>
      </div>
    </div>
  );
}
