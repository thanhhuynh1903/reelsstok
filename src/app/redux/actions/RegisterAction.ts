import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { register } from "@/ServerRequest";

interface RegisterState {
  username: string;
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  status: number | null;
}

const initialState: RegisterState = {
  username: "",
  email: "",
  password: "",
  loading: false,
  error: null,
  status: null,
};

// Async thunk for register
export const registerUser = createAsyncThunk<
  { username: string; email: string; password: string; status: number }, // Return type
  { username: string; email: string; password: string }, // Argument type
  { rejectValue: string }
>("register/registerUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await register(
      credentials.username,
      credentials.email,
      credentials.password
    );
    if (response.status === 200) {
      return { ...credentials, status: response.status };
    } else {
      return rejectWithValue("Register failed");
    }
  } catch {
    return rejectWithValue("Register failed");
  }
});

const registerSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    refresh(state) {
      state.username = "";
      state.email = "";
      state.password = "";
      state.loading = false;
      state.error = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.status = action.payload.status;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
        state.status = null;
      });
  },
});

export const { refresh } = registerSlice.actions;
export default registerSlice.reducer;