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
  addTodo: (todo: Todo) => void;
  editTodo: (id: number) => void;
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
  setTodo: (todo) => set({ todo }),
  addTodo: (todo) => set((state) => ({ todo: [...state.todo, todo] })),
  editTodo: (id) => {
    const foundTodo = data.todos.find((todo) => todo.id === id);
    if (foundTodo) {
      set({ todo: [foundTodo] });
      return true;
    }
    return false;
  },
  deleteTodo: (id) => {
    const foundTodo = data.todos.find((todo) => todo.id === id);
    if (foundTodo) {
      set((state) => ({
        todo: state.todo.filter((todo) => todo.id !== id),
      }));
      return true;
    }
    return false;
  },
}));
