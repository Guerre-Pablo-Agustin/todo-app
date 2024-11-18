"use client";
import { useAppStore } from "@/store/appStore";
import { Todo } from "@/types/TodoType";
import { useState } from "react";
import Swal from "sweetalert2";

const CreateForm = () => {
  const { addTodo, todo } = useAppStore(); 

  console.log("todo", todo);

  const [newTodo, setnewTodo] = useState<Todo>({
    id: 0, 
    title: "",
    description: "",
    status: "Pendiente",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setnewTodo((prev: Todo) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const maxId = todo.length > 0 ? Math.max(...todo.map((t: Todo) => t.id)) : 0;

    const addnewTodo = {
      ...newTodo,
      id: maxId + 1, 
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addTodo(addnewTodo);

    Swal.fire({
      title: "Tarea creada",
      text: "La tarea ha sido creada con éxito.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });

    setnewTodo({
      id: 0,
      title: "",
      description: "",
      status: "Pendiente",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Crear Nueva Tarea</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newTodo.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newTodo.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Estado
          </label>
          <select
            id="status"
            name="status"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newTodo.status}
            onChange={handleInputChange}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Completada">Completada</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Tarea
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
