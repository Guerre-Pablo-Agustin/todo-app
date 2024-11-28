import { useAppStore } from "@/store/appStore";
import { Todo } from "@/types/TodoType";
import { useDraggable } from "@dnd-kit/core";
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { useRef } from "react";
import { motion } from "motion/react";

const DraggableTask = ({
  task,

}: {
  task: Todo;
}) => {
  const { deleteTodo } = useAppStore();
  const trashRef = useRef<HTMLButtonElement>(null);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id.toString(),

      disabled: trashRef.current?.matches(":hover"),
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 9999 : "auto",
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Deseas eliminar la tarea?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodo(id);
        Swal.fire({
          title: "Eliminado",
          text: "La tarea ha sido eliminada.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pendiente":
        return <ExclamationCircleIcon className="h-4 w-4 text-green-600" />;
      case "En progreso":
        return <ClockIcon className="h-4 w-4 text-yellow-600" />;
      case "Completada":
        return <CheckCircleIcon className="h-4 w-4 text-purple-600" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-3 rounded-md mb-2 shadow-md shadow-blue-500/50 divide-y-2 z-10 "
    >
      <motion.div
        initial={{ opacity: 1, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex gap-2 justify-center items-center">
            {getStatusIcon(task.status)}
            <h3 className="font-semibold text-sm py-1 px-2">{task.title}</h3>
          </div>
          <button
            ref={trashRef}
            onClick={(e) => handleDelete(e, task.id)}
            className="bg-red-500 text-white px-2 py-1 rounded-md shadow-md shadow-red-500/50 hover:bg-red-600 transition-all duration-300 ease-in-out"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>

        <p className="text-gray-500 py-1 px-2">{task.description}</p>
      </motion.div>
    </div>
  );
};

export default DraggableTask;
