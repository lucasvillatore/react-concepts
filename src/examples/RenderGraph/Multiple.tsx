import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import './style.css';

interface NodeProps {
  label: string;
  children?: ReactNode;
  initialValue?: number;
  parentSum?: number;
}

function Node({ label, children, initialValue = 0, parentSum = 0 }: NodeProps) {
  const [localCount, setLocalCount] = useState(initialValue);
  const totalValue = parentSum + localCount;

  const renderCount = useRef(0);
  const countSpanRef = useRef<HTMLElement>(null);

  // NOVA REF: Referência direta para o cartão visual (a div)
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
     renderCount.current += 1;

     // Atualiza o texto de contagem
     if (countSpanRef.current) {
         countSpanRef.current.innerText = `Renders: ${renderCount.current}`;
     }

     // Lógica do Flash (Piscar) - Agora usando REF, muito mais seguro
     if (cardRef.current) {
         const el = cardRef.current;

         // Remove a classe
         el.classList.remove('flash');

         // Truque do navegador: Força o "Reflow" (ler uma propriedade de dimensão)
         // Isso obriga o navegador a processar que a classe saiu
         void el.offsetWidth;

         // Adiciona a classe de volta para reiniciar a animação
         el.classList.add('flash');
     }
  }); // Sem array de dependências = Roda SEMPRE que renderizar

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setLocalCount(prev => prev + 1);
  };

  return (
    <li>
      <div
        ref={cardRef} // <--- Ligamos a REF aqui
        className="node-card"
        onClick={handleClick}
        title={`Pai (${parentSum}) + Local (${localCount}) = ${totalValue}`}
        style={{ minWidth: '120px' }}
      >
        <strong>{label}</strong>

        <div style={{ marginTop: 5, fontSize: '0.8em', color: '#666' }}>
           Pai: {parentSum} + Eu: {localCount}
        </div>

        <div style={{ margin: '2px 0', fontSize: '1.4em', fontWeight: 'bold', color: '#1890ff' }}>
          = {totalValue}
        </div>

        <small ref={countSpanRef} style={{ color: '#999', fontSize: '0.7em' }}>
            Renders: 0
        </small>
      </div>

      {children && (
        <ul>
          {Children.map(children, child => {
            if (isValidElement(child)) {
              return cloneElement(child as any, { parentSum: totalValue });
            }
            return child;
          })}
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
    </div>
  );
}
