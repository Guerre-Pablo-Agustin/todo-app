"use client";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/appStore";
import EditForm from "@/components/Panel/EditForm/EditForm";
import Link from "next/link";
import { Todo } from "@/types/TodoType";

// Cambiamos Params a un tipo regular, ya que lo pasaremos como promesa
type Params = {
  id: string;
};

const Page = ({ params }: { params: Promise<Params> }) => {
  const { todo, loadTodo } = useAppStore();
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
  const [id, setId] = useState<string | null>(null);

 
  useEffect(() => {
    const fetchParams = async () => {
      const { id } = await params;
      setId(id); 
    };

    fetchParams();
  }, [params]);


  useEffect(() => {
    loadTodo(); 
  }, [loadTodo]);

  
  useEffect(() => {
    if (id) {
      const todoItem = todo.find((t) => t.id === Number(id));
      if (todoItem) {
      setTodoToEdit(todoItem); 
      }
    }
  }, [id, todo]); 

  
  if (!todoToEdit) {
    return <div>No se encontró la tarea</div>;
  }

  return (
    <section className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Editar Tarea</h1>
      <div>
        <EditForm toDo={todoToEdit} />
      </div>
      <div className="mt-4 flex justify-end">
        <Link href="/panel/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Volver
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Page;
