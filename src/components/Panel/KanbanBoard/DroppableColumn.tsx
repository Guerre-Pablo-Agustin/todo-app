import { useDroppable } from "@dnd-kit/core";
import { Trans } from "react-i18next";
import { motion } from "motion/react";

const DroppableColumn = ({
  id,
  children,
  onAddTaskClick,
  taskCount
}: {
  id: string;
  children: React.ReactNode;
  onAddTaskClick: () => void;
  taskCount: number;
}) => {
  const { setNodeRef } = useDroppable({ id });


  const taskColor = (status: string) => {
    switch (status) {
      case "Pendiente":
        return "bg-green-500";
      case "En progreso":
        return "bg-yellow-500";
      case "Completada":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };


  return (
    <motion.div
    initial={{ height: 300 }} 
    animate={{ height: `auto` }} 
    transition={{
      type: "spring",
      stiffness: 200,
      damping: 20,
    }}
      ref={setNodeRef}
      className="w-full md:w-1/3 bg-gray-100 border-2 border-gray-300 p-4 rounded-md min-h-[300px]
      shadow-md shadow-gray-500/50 " 
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 items-center">
        <p className="text-lg font-bold font-serif">
          <Trans i18nKey={`panel.kanbanColumn.${id}`}>{id}</Trans>
        </p>
      <p className={`text-sm text-white font-bold font-serif rounded-full px-2 py-1 ${taskColor(id)}`}>{taskCount}</p>
        </div>
        <button
          onClick={onAddTaskClick}
          className="bg-blue-500 text-white px-2 py-1 rounded-md shadow-md shadow-blue-500/50 hover:bg-blue-600 transition-all duration-300 ease-in-out font-serif"
        >
          +  <Trans i18nKey="panel.kanbanColumn.NewTask">Nueva tarea</Trans>
        </button>
      </div>
      <div className="">

      {children}
      </div>
    </motion.div>
  );
};

export default DroppableColumn;
