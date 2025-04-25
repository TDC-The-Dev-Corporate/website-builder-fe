import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  createPortfolio,
  getPortfolios,
  publish,
  remove,
  updatePortfolio,
} from "../api/portfolio";

interface PortfolioState {
  layout: TemplateLayout;
  loading: boolean;
  error: string | null;
}

const initialState: PortfolioState = {
  layout: null,
  loading: false,
  error: null,
};

export const generatePortfolio = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("portfolios/create", async (data, { rejectWithValue }) => {
  try {
    const response = await createPortfolio(data);
    return response;
  } catch (error: any) {
    const errorMessage = error.message || "Failed to create portfolio";
    return rejectWithValue(errorMessage);
  }
});

export const updateExistingPortfolio = createAsyncThunk(
  "portfolio/update",
  async ({ id, data }: { id: string; data: any }, thunkAPI) => {
    try {
      const updatedPortfolio = await updatePortfolio(id, data);
      return updatedPortfolio;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

export const getAllPortfolios = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("portfolios/get", async (_, { rejectWithValue }) => {
  try {
    const response = await getPortfolios();
    return response;
  } catch (error: any) {
    const errorMessage = error.message || "Failed to create portfolio";
    return rejectWithValue(errorMessage);
  }
});

export const publishPortfolio = createAsyncThunk(
  "portfolio/publish",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await publish(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const deleteDraft = createAsyncThunk(
  "portfolio/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await remove(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generatePortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        generatePortfolio.fulfilled,
        (state, action: PayloadAction<TemplateLayout>) => {
          state.loading = false;
          state.layout = action.payload;
        }
      )
      .addCase(generatePortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateExistingPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateExistingPortfolio.fulfilled,
        (state, action: PayloadAction<TemplateLayout>) => {
          state.loading = false;
        }
      )
      .addCase(updateExistingPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllPortfolios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPortfolios.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getAllPortfolios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(publishPortfolio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishPortfolio.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(publishPortfolio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteDraft.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDraft.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteDraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const portfolioReducer = portfolioSlice.reducer;
