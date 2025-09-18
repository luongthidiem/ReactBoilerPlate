// src/components/TodoList.tsx
import TodoItem from "./TodoItem";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onUpdated: () => void;
}

export default function TodoList({ todos, onUpdated }: TodoListProps) {
  return (
    <div className="w-full space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdated={onUpdated} />
      ))}
    </div>
  );
}
