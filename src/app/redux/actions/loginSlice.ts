import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { login } from "@/ServerRequest";
import { AxiosResponse } from "axios";

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
  status : null
};

// Async thunk for login
export const loginUser = createAsyncThunk<
  { email: string; password: string,status: number }, // Return type
  { email: string; password: string }, // Argument type
  { rejectValue: string }
>("login/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response : any = await login(credentials.email, credentials.password);
    if (response.status === 200) {
      return { ...credentials, status: response.status };
    } else {
      throw new Error("Login failed");
    }
  } catch (err: any) {
    return rejectWithValue(err.status || "Login failed");
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.email = "";
      state.password = "";
      state.loading = false;
      state.error = null;
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
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
