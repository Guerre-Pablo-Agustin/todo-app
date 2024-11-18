"use client";
import { useAppStore } from '@/store/appStore';
import { Todo } from '@/types/TodoType';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

type Props = {
    toDo: Todo;
}

const EditForm = (toDo : Props) => {

    const {  editTodo } = useAppStore();

    console.log("toDo", toDo);

    const todoData = toDo.toDo;

    const [title, setTitle] = useState(todoData?.title);
    const [description, setDescription] = useState(todoData?.description);
    const [status, setStatus] = useState(todoData?.status);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !description || !status) {
            Swal.fire({
                title: "Error",
                text: "Por favor, rellena todos los campos",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            return;
        }

        const updatedTodo = {
            title,
            description,
            status,
        };

        editTodo(todoData?.id, updatedTodo);

        Swal.fire({
            title: "Cambios guardados",
            text: "Los cambios se han guardado correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
        });

    }


  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Título
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Estado
          </label>
          <select
            id="status"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
          Guardar Cambios
        </button>
      </form>
    </div>
  )
}

export default EditForm