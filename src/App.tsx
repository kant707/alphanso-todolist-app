import ListItem from "./components/ListItem";
import PillButton from "./components/PillButton";
import { FiSearch } from "react-icons/fi";
import { useTodo } from "./TodoContext";
import "./App.css";

function App() {
  const {
    filteredTodo,
    inputValue,
    isDuplicate,
    filter,
    handleChange,
    handleSubmit,
    completeTodo,
    deleteTodo,
    setFilter,
    debounceSearch,
    inputRef,
    searchRef,
  } = useTodo();

  return (
    <div className="min-h-screen w-2/3 pt-12 md:pt-24">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 mb-6">
        <label className="font-bold text-2xl" htmlFor="searchTodo">
          Today
        </label>
        <div className="w-full md:w-2/3 relative flex items-center">
          <FiSearch className="absolute left-3" color="#a0aec0" />
          <input
            type="text"
            id="searchTodo"
            placeholder="Search"
            className="rounded-full appearance-none border w-full py-2 pl-8 pr-3 text-gray-700 leading-tight focus:outline-none"
            onChange={(e) => debounceSearch(e.target.value)}
            ref={searchRef}
          />
        </div>
        <div className="flex gap-2">
          <PillButton
            value="All"
            btnAction={() => setFilter("All")}
            isSelected={filter === "All"}
          />
          <PillButton
            value="Completed"
            btnAction={() => setFilter("Completed")}
            isSelected={filter === "Completed"}
          />
          <PillButton
            value="Incomplete"
            btnAction={() => setFilter("Incomplete")}
            isSelected={filter === "Incomplete"}
          />
        </div>
      </div>
      <div>
        <div className="max-h-[calc(100vh-22rem)] md:max-h-[calc(100vh-18rem)] overflow-y-auto">
          {filteredTodo?.map((item, index) => {
            return (
              item.todo && (
                <ListItem
                  key={index}
                  value={item.todo}
                  isCompleted={item.isCompleted}
                  completeTodo={() => completeTodo(index)}
                  deleteTodo={() => deleteTodo(index)}
                />
              )
            );
          })}
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Type something"
            className="rounded appearance-none mb-2 border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            onChange={(e) => handleChange(e.target.value)}
            value={inputValue}
            ref={inputRef}
          />
          <button
            type="submit"
            className={`w-full bg-black text-white border-none ${
              inputValue && !isDuplicate ? "" : "bg-opacity-25"
            }`}
            disabled={inputValue && !isDuplicate ? false : true}
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
