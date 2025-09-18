// src/pages/TodoPage.tsx
import { useEffect, useState } from "react";
import { getTodos, addTodo } from "@/api/todo";
import TodoList from "@/components/TodoList";
import type { Todo } from "@/api/todo";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");

  // load todo khi vào trang
  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  // thêm todo
  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await addTodo(newTitle);
    setNewTitle("");
    loadTodos();
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Todo App ✅</h1>

      {/* Form Add */}
      <div className="flex gap-2 mb-4">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter todo..."
          className="flex-1 border px-2 py-1 rounded"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-1 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>

      {/* Danh sách */}
      <TodoList todos={todos} onUpdated={loadTodos} />
    </div>
  );
}
