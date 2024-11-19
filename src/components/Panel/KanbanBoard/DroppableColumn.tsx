import { useDroppable } from "@dnd-kit/core";

const DroppableColumn = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="w-1/3 bg-gray-100 p-4 rounded-md min-h-[300px]"
    >
      <h2 className="text-xl font-bold mb-4">{id}</h2>
      {children}
    </div>
  );
};

export default DroppableColumn;
