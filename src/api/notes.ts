// Định nghĩa kiểu dữ liệu cho 1 Note
export type Note = {
  id: string; // id duy nhất của note (UUID hoặc string)
  title: string; // tiêu đề
  content: string; // nội dung
  createdAt?: string; // ngày tạo (optional)
  updatedAt?: string; // ngày cập nhật (optional)
};

// Base URL cho tất cả API notes
const API_URL = "/api/notes";

// Hàm tiện ích: xử lý response trả về
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    // Nếu status không phải 2xx
    const errorText = await res.text(); // Lấy error message từ body
    throw new Error(errorText || "API Error"); // Ném ra lỗi để caller bắt
  }
  return res.json(); // Nếu OK → parse JSON và trả về
}

// ---- CRUD API---

// Lấy danh sách tất cả notes
export async function getNotes(): Promise<Note[]> {
  const res = await fetch(API_URL); // Gọi GET /api/notes
  return handleResponse<Note[]>(res); // Xử lý response
}

// Lấy chi tiết 1 note theo id
export async function getNote(id: string): Promise<Note> {
  const res = await fetch(`${API_URL}/${id}`); // Gọi GET /api/notes/:id
  return handleResponse<Note>(res);
}

// add one notes new
export async function addNote(data: {
  title: string;
  content: string;
}): Promise<Note> {
  const res = await fetch(API_URL, {
    // Gọi POST /api/notes
    method: "POST",
    headers: { "Content-Type": "application/json" }, // gửi JSON
    body: JSON.stringify(data), // body = { title, content }
  });
  return handleResponse<Note>(res);
}

// update 1 note
export async function updateNote(
  id: string,
  data: Partial<Note>, // cho phép chỉ update 1 phần
): Promise<Note> {
  const res = await fetch(`${API_URL}/${id}`, {
    // Gọi PUT /api/notes/:id
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // patch dữ liệu mới
  });
  return handleResponse<Note>(res);
}

// delte 1 note
export async function deleteNote(
  id: string,
): Promise<{ success: boolean; id: string }> {
  const res = await fetch(`${API_URL}/${id}`, {
    // Gọi DELETE /api/notes/:id
    method: "DELETE",
  });
  return handleResponse<{ success: boolean; id: string }>(res);
}
