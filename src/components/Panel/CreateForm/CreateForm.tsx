"use client";
import { useAppStore } from "@/store/appStore";
import { Todo } from "@/types/TodoType";
import { useState } from "react";
import { Trans } from "react-i18next";
import Swal from "sweetalert2";

const CreateForm = () => {
  const { addTodo, todo } = useAppStore();

  console.log("todo", todo);

  const [newTodo, setnewTodo] = useState<Todo>({
    id: 0,
    title: "",
    description: "",
    status: "Pendiente",
    createdAt: "",
    updatedAt: "",
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

 
    const addnewTodo = {
      ...newTodo,
      id: Date.now(), 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
      createdAt: "",
      updatedAt: "",
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          <Trans i18nKey="panel.form.titleCreate">Crear Nueva Tarea</Trans>
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            <Trans i18nKey="panel.form.labelTitle">Título</Trans>
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
            <Trans i18nKey="panel.form.labelDescription">Descripción</Trans>
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
            <Trans i18nKey="panel.form.labelStatus">Estado</Trans>
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
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md shadow-blue-500/50"
        >
          <Trans i18nKey="panel.form.buttonCreate">Crear tarea</Trans>
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
