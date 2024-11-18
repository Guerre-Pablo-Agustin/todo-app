"use client";
import { useAppStore } from "@/store/appStore";
import Link from "next/link";
import Swal from "sweetalert2";
import { useEffect } from "react";

const TodoList = () => {
  const { todo, deleteTodo, loadTodo } = useAppStore();

  // Sincroniza los datos iniciales con el estado global
  useEffect(() => {
    loadTodo(); // Sincroniza los datos desde localStorage al estado global
  }, [loadTodo]);

  const getStatus = (status: string) => {
    switch (status) {
      case "Pendiente":
        return "bg-green-500 text-white";
      case "En progreso":
        return "bg-yellow-500 text-white";
      case "Completada":
        return "bg-violet-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleDelete = (id: number) => {
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

  return (
    <div>
      <table className="w-full table-auto">
        <thead className="text-gray-700 text-sm font-medium uppercase">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {todo.map((t) => (
            <tr key={t.id}>
              <td className="text-sm text-center p-2">{t.id}</td>
              <td className="text-sm text-start p-2">{t.title}</td>
              <td className="text-sm text-start p-2">{t.description}</td>
              <td className={`text-sm text-center rounded`}>
                <p className={`${getStatus(t.status)} py-0.5 px-2 rounded`}>
                  {t.status}
                </p>
              </td>
              <td className="text-sm text-center flex gap-2 mx-auto p-2">
                <Link href={`/panel/edit/${t.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Editar
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
