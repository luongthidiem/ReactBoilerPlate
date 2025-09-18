import { useState } from "react";
import type { Note } from "@/api/notes";

type NoteItemProps = {
  note: Note;
  onEdit: (id: string, updates: Partial<Note>) => void;
  onDelete: (id: string) => void;
};

export default function NoteItem({ note, onEdit, onDelete }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;
    onEdit(note.id, { title, content });
    setIsEditing(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 mb-3">
      {isEditing ? (
        <div className="space-y-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded font-bold"
            placeholder="Note title"
            autoFocus
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Note content"
            rows={3}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-bold">{note.title}</h3>
          <p className="text-gray-700 dark:text-gray-300">{note.content}</p>
          <small className="text-sm text-gray-500 block">
            {note.updatedAt
              ? `Updated: ${new Date(note.updatedAt).toLocaleString()}`
              : `Created: ${new Date(note.createdAt || "").toLocaleString()}`}
          </small>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
