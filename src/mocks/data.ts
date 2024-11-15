import { Todo } from "../types/TodoType";
import { User } from "../types/UserType";

export const data: {
  users: User[];
  todos: Todo[];
} = {
  users: [
    {
      id: 1,
      name: "Juan Pérez",
      email: "admin@example.com",
      password: "password123",
      image: "/images/avatars/hombre.jpg",
    },
    {
      id: 2,
      name: "Ana Gómez",
      email: "ana.gomez@example.com",
      password: "password456",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 3,
      name: "Carlos Sánchez",
      email: "carlos.sanchez@example.com",
      password: "password789",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ],
  todos: [
    {
      id: 1,
      title: "Tarea de frontend",
      description: "Realizar la implementación de la interfaz de usuario en el proyecto.",
      status: "Pendiente",
      createdAt: "2024-11-10T10:00:00Z",
      updatedAt: "2024-11-10T10:00:00Z",
    },
    {
      id: 2,
      title: "Tarea de backend",
      description: "Desarrollar el endpoint para la autenticación de usuarios.",
      status: "En progreso",
      createdAt: "2024-11-11T09:00:00Z",
      updatedAt: "2024-11-11T09:00:00Z",
    },
    {
      id: 3,
      title: "Revisión de código",
      description: "Revisar el código del pull request y realizar comentarios.",
      status: "Completada",
      createdAt: "2024-11-09T14:30:00Z",
      updatedAt: "2024-11-09T14:45:00Z",
    },
    {
      id: 4,
      title: "Actualización de dependencias",
      description: "Actualizar las dependencias del proyecto y verificar que todo funcione correctamente.",
      status: "Pendiente",
      createdAt: "2024-11-12T08:00:00Z",
      updatedAt: "2024-11-12T08:00:00Z",
    },
    {
      id: 5,
      title: "Escribir documentación",
      description: "Redactar la documentación del proyecto para la entrega final.",
      status: "En progreso",
      createdAt: "2024-11-10T12:00:00Z",
      updatedAt: "2024-11-10T12:00:00Z",
    },
  ],
};
