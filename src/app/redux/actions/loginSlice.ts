import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "@/ServerRequest";
interface LoginResponse {
  status: number;
}
interface LoginState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  status?: number | null;
}

const initialState: LoginState = {
  email: "",
  password: "",
  loading: false,
  error: null,
  status: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk<
  { email: string; password: string; status: number }, // Return type
  { email: string; password: string }, // Argument type
  { rejectValue: string }
>(
  "login/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials.email, credentials.password) as LoginResponse;
      if (response.status === 200) {
        return { ...credentials, status: response?.status };
      } else {
        return rejectWithValue("Login failed");
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "message" in err) {
        return rejectWithValue((err as { message?: string }).message || "Login failed");
      }
      return rejectWithValue("Login failed");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.email = "";
      state.password = "";
      state.loading = false;
      state.error = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.status = action.payload.status;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        // action.payload is string | undefined
        state.error = action.payload ?? "Login failed";
        state.status = null;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;