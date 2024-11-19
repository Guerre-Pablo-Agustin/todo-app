"use client";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { useAppStore } from "@/store/appStore";
import DroppableColumn from "./DroppableColumn";
import DraggableTask from "./Task";

const KanbanBoard = () => {
  const { todo, setTodo } = useAppStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

   
    if (!over) return;
    
    console.log('active:', active);
    console.log('over:', over);
   
    
    if (active.id === over.id) return;

   
    const updatedTodos = [...todo];
    
  
    const draggedTaskIndex = updatedTodos.findIndex((task) => task.id === Number(active.id)); // 
    
    
    if (draggedTaskIndex === -1) {
      console.error("No se encontró la tarea con id:", active.id);
      return; 
    }

   
    if (!over.id || !["Pendiente", "En progreso", "Completada"].includes(String(over.id))) {
      console.error("Valor de over.id no válido:", over.id);
      return;
    }
   
    updatedTodos[draggedTaskIndex].status = String(over.id);


  
    setTodo(updatedTodos);
    
    console.log('updatedTodos:', updatedTodos);
  };

 
  const getTasksByStatus = (status: string) => todo.filter((task) => task.status === status);

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="flex gap-4">
        {["Pendiente", "En progreso", "Completada"].map((status) => (
          <DroppableColumn key={status} id={status}>
            <SortableContext
              items={getTasksByStatus(status).map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {getTasksByStatus(status).map((task) => (
                <DraggableTask key={task.id} task={task} />
              ))}
            </SortableContext>
          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
