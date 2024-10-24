import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

interface TodoItem {
  todo: string;
  isCompleted: boolean;
}

interface TodoContextType {
  todo: TodoItem[];
  filteredTodo: TodoItem[];
  inputValue: string;
  isDuplicate: boolean;
  filter: string;
  searchTerm: string;
  handleChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  completeTodo: (index: number) => void;
  deleteTodo: (index: number) => void;
  setFilter: (filter: string) => void;
  debounceSearch: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  searchRef: React.RefObject<HTMLInputElement>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const todoObjInitialShape = { todo: "", isCompleted: false };
  const [todo, setTodo] = useState<TodoItem[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [todoObjInitialShape];
  });
  const [filteredTodo, setFilteredTodo] = useState<TodoItem[]>([
    todoObjInitialShape,
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (value: string) => {
    const duplicate = todo.some((item) => item.todo === value);
    setIsDuplicate(duplicate);
    setInputValue(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDuplicate && inputValue !== "") {
      const newTodo = { todo: inputValue, isCompleted: false };
      const updatedTodos = [newTodo, ...todo];
      setTodo(updatedTodos);
      // setTodo((prev) => [{ todo: inputValue, isCompleted: false }, ...prev]);
      setInputValue("");
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  const completeTodo = (index: number) => {
    const updatedTodos = todo.map((todo, i) => {
      if (i === index) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodo(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todo.filter((_, i) => i !== index);
    setTodo(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const filterTodos = useCallback(() => {
    let filtered = todo;
    if (filter === "Completed") {
      filtered = todo.filter((item) => item.isCompleted);
    } else if (filter === "Incomplete") {
      filtered = todo.filter((item) => !item.isCompleted);
    }
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.todo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredTodo(filtered);
  }, [todo, filter, searchTerm]);

  const debounce = <T extends (...args: any[]) => void>(
    cb: T,
    delay: number
  ) => {
    let timeoutId: number | undefined;
    return (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const debounceSearch = useCallback(
    debounce((value: string) => setSearchTerm(value), 300),
    []
  );

  useEffect(() => {
    const activeElement = document.activeElement;
    if (inputRef.current && activeElement !== searchRef.current) {
      inputRef.current.focus();
    }
    filterTodos();
  }, [todo, filter, searchTerm, filterTodos]);

  // console.log(todo);

  return (
    <TodoContext.Provider
      value={{
        todo,
        filteredTodo,
        inputValue,
        isDuplicate,
        filter,
        searchTerm,
        handleChange,
        handleSubmit,
        completeTodo,
        deleteTodo,
        setFilter,
        debounceSearch,
        inputRef,
        searchRef,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
