"use client";
import { useAppStore } from "@/store/appStore";
import Link from "next/link";
import Swal from "sweetalert2";
import { useEffect } from "react";
import i18n from "@/lib/i18n";
import { Trans } from "react-i18next";

const TodoList = () => {
  const { todo, deleteTodo, loadTodo, language } = useAppStore();

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    loadTodo();
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
    <section>
      <div className="text-2xl text-center font-bold mb-4">
        <Trans i18nKey="panel.table.title">Lista de tareas</Trans>
      </div>
      <table className="w-full table-auto">
        <thead className="text-gray-700 text-sm font-medium uppercase">
          <tr>
            <th>#</th>
            <th>
              <Trans i18nKey="panel.table.TodoTitle">Título</Trans>
            </th>
            <th>
              <Trans i18nKey="panel.table.TodoDescription">Descripción</Trans>
            </th>
            <th>
              <Trans i18nKey="panel.table.TodoStatus">Estado</Trans>
            </th>
            <th>
              <Trans i18nKey="panel.table.TodoActions">Acciones</Trans>
            </th>
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
                    <Trans i18nKey="panel.table.TodoEdit">Editar</Trans>
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <Trans i18nKey="panel.table.TodoDelete">Eliminar</Trans>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TodoList;
