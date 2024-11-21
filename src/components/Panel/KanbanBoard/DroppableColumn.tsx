import { useDroppable } from "@dnd-kit/core";
import { Trans } from "react-i18next";

const DroppableColumn = ({
  id,
  children,
  onAddTaskClick,
}: {
  id: string;
  children: React.ReactNode;
  onAddTaskClick: () => void;
}) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="w-full md:w-1/3 bg-gray-100 border-2 border-gray-300 p-4 rounded-md min-h-[300px]
      shadow-md shadow-gray-500/50 "
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          <Trans i18nKey={`panel.kanbanColumn.${id}`}>{id}</Trans>
        </h2>
        <button
          onClick={onAddTaskClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md shadow-blue-500/50 hover:bg-blue-600 transition-all duration-300 ease-in-out"
        >
          +  <Trans i18nKey="panel.kanbanColumn.NewTask">Nueva tarea</Trans>
        </button>
      </div>
      {children}
    </div>
  );
};

export default DroppableColumn;
