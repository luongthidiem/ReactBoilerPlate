import { useEffect, useState } from "react";
import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
  type Note,
} from "@/api/notes";
import NoteItem from "@/components/NoteItem";
import NoteForm from "@/components/NoteForm";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Load notes lần đầu
  useEffect(() => {
    getNotes()
      .then(setNotes)
      .finally(() => setLoading(false));
  }, []);

  // Thêm note
  const handleAdd = async (data: { title: string; content: string }) => {
    const newNote = await addNote(data);
    setNotes((prev) => [...prev, newNote]);
  };

  // Update note
  const handleUpdate = async (id: string, updates: Partial<Note>) => {
    const updated = await updateNote(id, {
      ...updates,
      updatedAt: new Date().toISOString(), // luôn update thời gian
    });
    setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
  };

  // Delete note
  const handleDelete = async (id: string) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">My Notes</h1>

      {/* Form thêm note */}
      <NoteForm onSubmit={handleAdd} />

      <div className="space-y-2">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={(id, updates) => handleUpdate(id, updates)}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
