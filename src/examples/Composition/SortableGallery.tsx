import { Divider, Typography } from 'antd';
import { useState } from 'react';
import { BaseImage } from './components/BaseImage';
import { BorderFrame } from './components/BorderFrame';
import { DraggableWrapper } from './components/DraggableWrapper';
import { WithCaption } from './components/WithCaption';


const { Title, Text } = Typography;

const INITIAL_IMAGES = [
  { id: '1', src: "https://picsum.photos/id/237/200/200", label: "1. Cachorro" },
  { id: '2', src: "https://picsum.photos/id/10/200/200", label: "2. Paisagem" },
  { id: '3', src: "https://picsum.photos/id/1025/200/200", label: "3. Pug" },
  { id: '4', src: "https://picsum.photos/id/1069/200/200", label: "4. Água Viva" },
];

export default function SortableGallery() {
  const [images, setImages] = useState(INITIAL_IMAGES);

  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedList = [...images];
    const [movedItem] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, movedItem);
    setImages(updatedList);
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Composição de Comportamento (Draggable)</Title>
      <Text>
        Aqui usamos composição não para colocar borda, mas para dar o
        <strong> superpoder</strong> de ser arrastável para a imagem.
        <br/>
        Tente arrastar as imagens para mudar a ordem.
      </Text>

      <Divider />

      <div style={{
        display: 'flex',
        gap: 20,
        flexWrap: 'wrap',
        background: '#f0f2f5',
        padding: 20,
        borderRadius: 10
      }}>
        {images.map((img, index) => (

          <DraggableWrapper
            key={img.id}
            index={index}
            onMoveItem={moveImage}
          >
            <div style={{ background: 'white', padding: 10, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <WithCaption text={img.label}>
                 <BorderFrame color="#ddd" width="1px">
                    <BaseImage src={img.src} alt={img.label} style={{ width: 150, height: 150, objectFit: 'cover' }} />
                 </BorderFrame>
              </WithCaption>
            </div>

          </DraggableWrapper>

        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <strong>Ordem atual (JSON):</strong>
        <pre style={{ background: '#333', color: '#fff', padding: 10, borderRadius: 5 }}>
          {JSON.stringify(images.map(i => i.label), null, 2)}
        </pre>
      </div>
    </div>
  );
};
