// src/features/todo/api/todoApi.ts
export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const API_URL = "/api/todos";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API Error");
  }
  return res.json();
}

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(API_URL);
  return handleResponse<Todo[]>(res);
}

export async function addTodo(title: string): Promise<Todo> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false }),
  });
  return handleResponse<Todo>(res);
}

export async function updateTodo(
  id: number,
  data: Partial<Todo>,
): Promise<Todo> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Todo>(res);
}

export async function deleteTodo(id: number): Promise<{ success: boolean }> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return handleResponse<{ success: boolean }>(res);
}
