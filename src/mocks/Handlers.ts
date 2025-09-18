import { rest } from "msw";
import type { Todo } from "@/api/todo";
import type { Note } from "@/api/notes";

// MOCK TODO
let todos: Todo[] = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Build a Todo App", completed: true },
];

let notes: Note[] = [
  {
    id: "1",
    title: "First Note",
    content: "This is a test one",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Second Note",
    content: "Another note here",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
// Fake user database
let fakeUser = {
  id: 1,
  name: "John Doe",
  email: "test@example.com",
  password: "123456",
  token: "fake-jwt-token-123",
};

export const handlers = [
  // Login
  rest.post("/auth/login", async (req, res, ctx) => {
    const { email, password } = await req.json();

    if (email === fakeUser.email && password === fakeUser.password) {
      return res(
        ctx.status(200),
        ctx.json({
          user: { id: fakeUser.id, name: fakeUser.name, email: fakeUser.email },
          token: fakeUser.token,
        }),
      );
    }

    return res(
      ctx.status(401),
      ctx.json({ message: "Invalid email or password" }),
    );
  }),

  rest.get("/auth/me", (req, res, ctx) => {
    const authHeader = req.headers.get("Authorization");

    if (authHeader === `Bearer ${fakeUser.token}`) {
      return res(
        ctx.status(200),
        ctx.json({
          id: fakeUser.id,
          name: fakeUser.name,
          email: fakeUser.email,
        }),
      );
    }

    return res(ctx.status(401), ctx.json({ message: "Unauthorized" }));
  }),
  rest.post("/auth/logout", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "Logged out" }));
  }),
  // Get todos
  rest.get("/api/todos", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),
  // Add todo
  rest.post("/api/todos", async (req, res, ctx) => {
    const { title } = await req.json();
    const newTodo = { id: Date.now(), title, completed: false };
    todos.push(newTodo);
    return res(ctx.status(201), ctx.json(newTodo));
  }),
  // Update todo
  rest.put("/api/todos/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const updated = await req.json();
    todos = todos.map((t) => (t.id === Number(id) ? { ...t, ...updated } : t));
    return res(ctx.status(200), ctx.json(updated));
  }),

  // Delete todo
  rest.delete("/api/todos/:id", (req, res, ctx) => {
    const { id } = req.params;
    todos = todos.filter((t) => t.id !== Number(id));
    return res(ctx.status(200), ctx.json({ success: true }));
  }),

  /// ----------- Notes ----------
  // Get all notes
  rest.get("/api/notes/:id", (req, res, ctx) => {
    const { id } = req.params;
    const note = notes.find((n) => n.id === id);
    if (!note) {
      return res(ctx.status(404), ctx.json({ message: "Note not found" }));
    }
    return res(ctx.status(200), ctx.json(note));
  }),

  // Add note
  rest.post("/api/notes", async (req, res, ctx) => {
    const data = await req.json();
    const newNote: Note = {
      id: String(Date.now()),
      title: data.title,
      content: data.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    notes.push(newNote);
    return res(ctx.status(201), ctx.json(newNote));
  }),

  // Update note
  rest.put("/api/notes/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const data = await req.json();
    notes = notes.map((n) =>
      n.id === id ? { ...n, ...data, updatedAt: new Date().toISOString() } : n,
    );
    return res(ctx.status(200), ctx.json(notes.find((n) => n.id === id)));
  }),

  // Delete note
  rest.delete("/api/notes/:id", (req, res, ctx) => {
    const { id } = req.params;
    notes = notes.filter((n) => n.id !== id);
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
];
