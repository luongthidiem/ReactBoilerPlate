// src/store/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  login as loginApi,
  getMe,
  type AuthResponse,
  type User,
} from "@/api/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

// Async thunk login
export const login = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const data = await loginApi(email, password);
    return data;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Async thunk load user từ token
export const loadUserFromToken = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("auth/loadUserFromToken", async (token, { rejectWithValue }) => {
  try {
    const user = await getMe(token);
    return user;
  } catch (err: any) {
    return rejectWithValue("Invalid token");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // load user từ token khi refresh
      .addCase(
        loadUserFromToken.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
        },
      )
      .addCase(loadUserFromToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
