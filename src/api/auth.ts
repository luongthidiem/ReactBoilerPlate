// ---- Types ----
export type User = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

// ---- Mock data ----
const MOCK_USER: User = {
  id: 1,
  name: "Test User",
  email: "test@gmail.com",
};

const MOCK_TOKEN = "fake-jwt-token";

// helper giả lập delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// ---- Login ----
export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  await delay(500);
  if (email === "diemluong@gmail.com" && password === "12345") {
    return { user: MOCK_USER, token: MOCK_TOKEN };
  }
  throw new Error("Invalid email or password");
};

// ---- Get current user ----
export const getMe = async (token: string): Promise<User> => {
  await delay(300);
  if (token === MOCK_TOKEN) {
    return MOCK_USER;
  }
  throw new Error("Invalid token");
};

// ---- Logout ----
export const logout = async (): Promise<{ message: string }> => {
  await delay(200);
  return { message: "Logged out successfully" };
};
