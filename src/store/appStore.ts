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

  //language
  setLanguage: (lang) => set({ language: lang }),

  //user
  setUser: (user) => set({ user }),
  login: (email, password) => {
    try {
      console.log("email", email, "password", password);
      const foundUser = data.users.find(
        (user) => user.email === email && user.password === password
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

  //todos
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
      const updatedTodo = [...state.todo, todo]; // Usa el estado actual
      localStorage.setItem("todos", JSON.stringify(updatedTodo)); // Actualiza localStorage
      return { todo: updatedTodo }; // Actualiza el estado
    });
  },
  editTodo: (id ,updatedTodo) => {
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
