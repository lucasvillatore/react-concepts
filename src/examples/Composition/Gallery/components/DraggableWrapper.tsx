import { type DragEvent, type ReactNode, useState } from 'react';

interface DraggableWrapperProps {
  index: number;
  children: ReactNode;
  onMoveItem: (fromIndex: number, toIndex: number) => void;
}

export const DraggableWrapper = ({ index, children, onMoveItem }: DraggableWrapperProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsOver(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isOver) setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);

    const draggedIndexStr = e.dataTransfer.getData('text/plain');
    const fromIndex = parseInt(draggedIndexStr, 10);
    const toIndex = index;

    if (fromIndex !== toIndex) {
      onMoveItem(fromIndex, toIndex);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        cursor: 'grab',
        opacity: isDragging ? 0.4 : 1,
        transform: isDragging ? 'scale(0.95)' : 'scale(1)',
        border: isOver ? '2px dashed #1890ff' : '2px solid transparent',
        transition: 'all 0.2s',
        borderRadius: 8
      }}
    >
      {children}
    </div>
  );
};
