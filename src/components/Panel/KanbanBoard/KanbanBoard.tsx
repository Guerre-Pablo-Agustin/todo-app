"use client";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { useAppStore } from "@/store/appStore";
import DroppableColumn from "./DroppableColumn";
import DraggableTask from "./DraggableTask";
import { useState } from "react";
import NewTaskForm from "./NewTaskForm";
import { AnimatePresence } from "motion/react";

const KanbanBoard = () => {
  const { todo, setTodo } = useAppStore();
  const [newTask, setNewTask] = useState({ 
    id: 0,
    title: "", 
    description: "", 
    status: "",
    createdAt : "", 
    updatedAt : "" });
  const [showForm, setShowForm] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const updatedTodos = [...todo];
    const activeTaskIndex = updatedTodos.findIndex((task) => task.id === Number(active.id));

    if (activeTaskIndex === -1) return;

    if (over.id && ["Pendiente", "En progreso", "Completada"].includes(String(over.id))) {
      updatedTodos[activeTaskIndex].status = String(over.id);
      setTodo(updatedTodos);
    }
  };

 

  const handleAddTask = () => {
    if (!newTask.title || !newTask.status) return alert("Complete todos los campos.");
    const newTaskWithId = {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTodo([...todo, newTaskWithId]);
    setNewTask({ id: 0, title: "", description: "", status: "" , createdAt : "", updatedAt : "" }); 
    setShowForm(false);
  };

  const getTasksByStatus = (status: string) => todo.filter((task) => task.status === status);

 

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
    <div className="grid gap-3 mx-auto grid-cols-1  lg:grid-cols-3">
      {["Pendiente", "En progreso", "Completada"].map((status) => (
        <DroppableColumn 
        key={status} 
        id={status}  
        taskCount={getTasksByStatus(status).length} 
        onAddTaskClick={() => {
          setNewTask({ ...newTask, status });
          setShowForm(true);
         
        }}
        >
          
          <SortableContext
          items={getTasksByStatus(status).map((task) => task.id)}
          strategy={verticalListSortingStrategy}
          >
            <AnimatePresence>
            {getTasksByStatus(status).map((task) => (
              <DraggableTask key={task.id} task={task} />
            ))}
            </AnimatePresence>
          </SortableContext>
        </DroppableColumn>
      ))}
    </div>
    {showForm && (
      <NewTaskForm
        onClose={() => setShowForm(false)}
        onAddTask={handleAddTask}
        newTask={newTask}
        setNewTask={setNewTask}
      />
    )}
  </DndContext>
  
  );
};

export default KanbanBoard;
