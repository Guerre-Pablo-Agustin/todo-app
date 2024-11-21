"use client";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { useAppStore } from "@/store/appStore";
import DroppableColumn from "./DroppableColumn";
import DraggableTask from "./DraggableTask";
import { useState } from "react";

const KanbanBoard = () => {
  const { todo, setTodo } = useAppStore();
  const [newTask, setNewTask] = useState({ 
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

  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
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
    setNewTask({ title: "", description: "", status: "" , createdAt : "", updatedAt : "" }); 
    setShowForm(false);
  };

  const getTasksByStatus = (status: string) => todo.filter((task) => task.status === status);

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
    <div className="flex flex-col  md:flex-row  gap-4 mx-auto">
      {["Pendiente", "En progreso", "Completada"].map((status) => (
        <DroppableColumn key={status} id={status} onAddTaskClick={() => {
          setNewTask({ ...newTask, status });
          setShowForm(true);
        }}
        >
         
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
    {showForm && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Nueva Tarea</h2>
          <input
            name="title"
            placeholder="Título"
            value={newTask.title}
            onChange={handleNewTaskChange}
            className="block w-full mb-2 p-2 border rounded-md"
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={newTask.description}
            onChange={handleNewTaskChange}
            className="block w-full mb-2 p-2 border rounded-md"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddTask}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Agregar
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )}
  </DndContext>
  
  );
};

export default KanbanBoard;
