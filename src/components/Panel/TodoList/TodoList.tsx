"use client";
import { useAppStore } from "@/store/appStore";
import Link from "next/link";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import i18n from "@/lib/i18n";
import { Trans } from "react-i18next";
import Searcher from "./Searcher";
import Paginated from "./Paginated";

const TodoList = () => {
  const { todo, deleteTodo, loadTodo, language } = useAppStore();

  //busqueda
  const [search, setSearch] = useState("");

  const filteredTodos = todo.filter((t) =>
    (t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.status.toLowerCase().includes(search.toLowerCase()))
  );


  //paginado
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTodos = filteredTodos.slice(
    startIndex,
    startIndex + itemsPerPage
  );


  //lenguaje
  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  //carga de datos
  useEffect(() => {
    loadTodo();
  }, [loadTodo]);




 

  const getStatus = (status: string) => {
    switch (status) {
      case "Pendiente":
        return "bg-green-500 text-white shadow-md shadow-green-500/50";
      case "En progreso":
        return "bg-yellow-500 text-white shadow-md shadow-yellow-500/50";
      case "Completada":
        return "bg-violet-500 text-white shadow-md shadow-violet-500/50";
      default:
        return "bg-gray-500 text-white shadow-md shadow-gray-500/50";
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
  
    {/* Buscador */}
    <div className="flex items-center m-6 gap-2">
      <Searcher search={search} setSearch={setSearch} />
    </div>
  
    {/* Tabla de tareas */}
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
        {currentTodos.map((t) => (
          <tr key={t.id}>
            <td className="text-sm text-center p-2">{t.id}</td>
            <td className="text-sm text-start p-2">{t.title}</td>
            <td className="text-sm text-start p-2">{t.description}</td>
            <td className={`text-sm text-center rounded`}>
              <p className={`${getStatus(t.status)} py-0.5 px-2 rounded`}>
                {t.status}
              </p>
            </td>
            <td className="text-sm text-center flex gap-2 items-center justify-center  p-2">
              <Link href={`/panel/edit/${t.id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md shadow-blue-500/50">
                  <Trans i18nKey="panel.table.TodoEdit">Editar</Trans>
                </button>
              </Link>
              <button
                onClick={() => handleDelete(t.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md shadow-red-500/50"
              >
                <Trans i18nKey="panel.table.TodoDelete">Eliminar</Trans>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  
    {/* Paginación */}
    <div className="flex justify-center items-center mt-4 gap-2">
        <Paginated currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  </section>
  );
};

export default TodoList;
