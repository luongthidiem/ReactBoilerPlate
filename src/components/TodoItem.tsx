import { useState } from "react";
import { updateTodo, deleteTodo } from "@/api/todo";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onUpdated: () => void;
}

export default function TodoItem({ todo, onUpdated }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const toggleCompleted = async () => {
    await updateTodo(todo.id, { ...todo, completed: !todo.completed });
    onUpdated();
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    onUpdated();
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    await updateTodo(todo.id, { ...todo, title });
    setIsEditing(false);
    onUpdated();
  };

  return (
    <div className="flex justify-between items-center border-b py-2">
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          autoFocus
          className="flex-1 border px-2 py-1 rounded"
        />
      ) : (
        <div
          className={`flex-1 cursor-pointer ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
          onClick={toggleCompleted}
        >
          {todo.title}
        </div>
      )}

      <div className="flex gap-2 ml-2">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-2 py-1 bg-yellow-500 text-white rounded"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleDelete}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
