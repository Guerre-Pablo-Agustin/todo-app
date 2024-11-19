"use client";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/appStore";
import EditForm from "@/components/Panel/EditForm/EditForm";
import { Todo } from "@/types/TodoType";
import { Trans } from "react-i18next";
import BackButton from "@/components/Panel/BackButton/BackButton";


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
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          <Trans i18nKey="panel.form.titleEdit">Edit Todo</Trans>
        </h2>
      </div>
      <div>
        <EditForm toDo={todoToEdit} />
      </div>
      <div className="mt-4 flex justify-end">
     <BackButton />
      </div>
    </section>
  );
};

export default Page;
