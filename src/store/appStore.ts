import { Todo } from "@/types/TodoType";
import { User } from "@/types/UserType";
import { create } from "zustand";
import { data } from "@/mocks/data";

interface AppStore {
  //user
  user: User | null;
  setUser: (user: User) => void;
  login: (mail: string, password: string) => boolean;
  logout: () => void;
  loaduser: () => void;
  createUser: (user: User) => void;

  // todos
  todo: Todo[];
  setTodo: (todo: Todo[]) => void;
  loadTodo: () => void;
  addTodo: (todo: Todo) => void;
  editTodo: (id: number, updatedTodo: Partial<Todo>) => void;
  deleteTodo: (id: number) => void;


  //language
  language: string;
  setLanguage: (language: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  todo: [],
  language: "en",

  // Language
  setLanguage: (lang) => set({ language: lang }),

  // User
  createUser: (newUser) => {
    set(() => {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const allUsers = [...data.users, ...existingUsers];
  
      const userExists = allUsers.some(
        (user: User) => user.email === newUser.email
      );
  
      if (userExists) {
        throw new Error("El usuario ya existe con este correo electrónico.");
      }
  
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
  
      return {};
    });
  },
  
  setUser: (user) => set({ user }),

  login: (email, password) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const allUsers = [...data.users, ...existingUsers]; 
  
      const foundUser = allUsers.find(
        (user: User) => user.email === email && user.password === password
      );
  
      if (foundUser) {
        set({ user: foundUser });
        localStorage.setItem("user", JSON.stringify(foundUser));
        return true;
      }
  
      return false;
    } catch (error) {
      console.error("Error en el login:", error);
      return false;
    }
  },
  

  loaduser: () => {
    const user = localStorage.getItem("user");
    if (user) {
      set({ user: JSON.parse(user) });
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },

  // Todos
  setTodo: (todo) => {
    set({ todo });
    localStorage.setItem("todos", JSON.stringify(todo));
  },

  loadTodo: () => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      set({ todo: JSON.parse(todos) });
    } else {
      set({ todo: data.todos });
    }
  },

  addTodo: (todo) => {
    set((state) => {
      const updatedTodo = [...state.todo, todo];
      localStorage.setItem("todos", JSON.stringify(updatedTodo));
      return { todo: updatedTodo };
    });
  },

  editTodo: (id, updatedTodo) => {
    set((state) => {
      const updatedTodos = state.todo.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todo: updatedTodos };
    });
  },

  deleteTodo: (id) => {
    set((state) => {
      const updatedTodos = state.todo.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todo: updatedTodos };
    });
  },
}));

