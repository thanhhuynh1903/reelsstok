// src/redux/slices/videoSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TikTokVideo } from "@/types/video-types";

interface VideoState {
  videos: TikTokVideo[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: VideoState = {
  videos: [],
  loading: false,
  error: null,
  status: "idle",
};

export const fetchVideos = createAsyncThunk<
  TikTokVideo[],
  void,
  { rejectValue: string }
>("videos/fetchVideos", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL_APIFY as string
    );
    
    // Validate and filter videos
    if (!Array.isArray(response.data)) {
      throw new Error("Invalid API response format");
    }
    
    return response.data.filter((video) => video.id) as TikTokVideo[];
  } catch (err) {
    let errorMessage = "Failed to load videos";
    
    if (axios.isAxiosError(err)) {
      errorMessage = err.response?.data?.message || err.message;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }
    
    return rejectWithValue(errorMessage);
  }
});

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    resetVideos: (state) => {
      state.videos = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.videos = action.payload;
        state.error = null;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || "Failed to load videos";
      });
  },
});

export const { resetVideos } = videoSlice.actions;
export default videoSlice.reducer;