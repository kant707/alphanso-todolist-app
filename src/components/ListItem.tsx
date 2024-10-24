import { MdOutlineCircle, MdOutlineCheckCircleOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

interface TodoItemProps {
  value: string;
  isCompleted: boolean;
  completeTodo: () => void;
  deleteTodo: () => void;
}
const ListItem: React.FC<TodoItemProps> = ({
  value,
  isCompleted,
  completeTodo,
  deleteTodo,
}) => {
  return (
    <ul>
      <li
        className={`flex gap-1 mb-3 items-center rounded border border-gray-300 pl-4 pr-2 py-2 ${
          isCompleted
            ? "bg-green-200 bg-opacity-25 border border-green-500"
            : ""
        }`}
      >
        {isCompleted ? (
          <MdOutlineCheckCircleOutline
            className="text-green-500 size-5"
            onClick={completeTodo}
          />
        ) : (
          <MdOutlineCircle
            className="text-gray-300 size-5"
            onClick={completeTodo}
          />
        )}
        {value}
        <button
          type="button"
          className="bg-transparent p-1 border-none ml-auto"
          onClick={deleteTodo}
        >
          <RxCross2 />
        </button>
      </li>
      {/* <li className="flex gap-1 mb-2 items-center rounded border border-gray-300 pl-4 pr-2 py-2">
        <MdOutlineCheckCircleOutline className="text-gray-300 size-5" />
        Buy grocery
        <button
          type="button"
          className="bg-transparent p-1 border-none ml-auto"
        >
          <RxCross2 />
        </button>
      </li>
      <li className="flex gap-1 mb-2 items-center rounded bg-green-200 bg-opacity-25 border border-green-500 pl-4 pr-2 py-2">
        <MdOutlineCheckCircleOutline className="text-green-500 size-5" />
        Buy grocery
        <button
          type="button"
          className="bg-transparent p-1 border-none ml-auto"
        >
          <RxCross2 />
        </button>
      </li> */}
    </ul>
  );
};

export default ListItem;
