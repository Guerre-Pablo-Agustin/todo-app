import { Todo } from '@/types/TodoType';
import React from 'react';

 type Props = {
  onClose: () => void;
  onAddTask: (task: Todo) => void;
  newTask: Todo;
  setNewTask : React.Dispatch<React.SetStateAction<Todo>>;
};


const NewTaskForm = ( { onClose, onAddTask, newTask, setNewTask } : Props) => {


  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    onAddTask(newTask);
    setNewTask({id: 0, title: '', description: '', status: '', createdAt: '', updatedAt: ''});
  };

  return (
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
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTaskForm;