import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getTemplates } from "../api/templates";
import { Template } from "@/app/types";

interface TemplatesState {
  templates: Template[];
  loading: boolean;
  error: string | null;
}

const initialState: TemplatesState = {
  templates: [],
  loading: false,
  error: null,
};

export const fetchTemplates = createAsyncThunk<
  Template[],
  void,
  { rejectValue: string }
>("templates/fetchTemplates", async (_, { rejectWithValue }) => {
  try {
    const response = await getTemplates();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to fetch templates");
  }
});

const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTemplates.fulfilled,
        (state, action: PayloadAction<Template[]>) => {
          state.loading = false;
          state.templates = action.payload;
        }
      )
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const templateReducer = templatesSlice.reducer;
