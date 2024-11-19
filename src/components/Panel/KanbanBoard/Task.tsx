import { Todo } from "@/types/TodoType";
import { useDraggable } from "@dnd-kit/core";



const DraggableTask = ({ task }: { task: Todo }) => {



  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id.toString(),
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-3 rounded-md mb-2 shadow-md shadow-blue-500/50 divide-y-2 "
    >
      <h3 className="font-semibold py-1 px-2 ">{task.title}</h3>
      
      <p className="text-gray-600 py-1 px-2">{task.description}</p>
    </div>
  );
};

export default DraggableTask;
