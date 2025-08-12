import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  clearCache,
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
  portfolios: any[];
}

const initialState: PortfolioState = {
  layout: null,
  loading: false,
  error: null,
  portfolios: [],
};

export const generatePortfolio = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("portfolios/create", async (data, { rejectWithValue }) => {
  try {
    const portfolio = await createPortfolio(data);
    console.log("Portfolio created successfully:", portfolio);
    return portfolio;
  } catch (error: any) {
    console.error("Failed to create portfolio:", error);
    return rejectWithValue(error.message || "Failed to create portfolio");
  }
});

export const updateExistingPortfolio = createAsyncThunk(
  "portfolio/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue, dispatch }) => {
    try {
      const updatedPortfolio = await updatePortfolio(id, data);
      console.log("Portfolio updated successfully:", updatedPortfolio);
      
      // Clear cache and refresh portfolios after successful update
      await clearCache();
      dispatch(getAllPortfolios());
      
      return updatedPortfolio;
    } catch (error: any) {
      console.error("Failed to update portfolio:", error);
      return rejectWithValue(error.message || "Failed to update portfolio");
    }
  }
);

export const getAllPortfolios = createAsyncThunk<
  any[],
  void,
  { rejectValue: string }
>("portfolio/getAll", async (_, { rejectWithValue }) => {
  try {
    const portfolios = await getPortfolios();
    console.log("Portfolios fetched successfully:", portfolios.length);
    return portfolios;
  } catch (error: any) {
    console.error("Failed to fetch portfolios:", error);
    return rejectWithValue(error.message || "Failed to fetch portfolios");
  }
});

export const resetCache = createAsyncThunk<any, void, { rejectValue: string }>(
  "portfolios/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await clearCache();
      return response;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to clear cache";
      return rejectWithValue(errorMessage);
    }
  }
);

export const publishPortfolio = createAsyncThunk(
  "portfolio/publish",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const publishedPortfolio = await publish(id);
      console.log("Portfolio published successfully:", publishedPortfolio);
      
      // Clear cache and refresh portfolios after successful publish
      await clearCache();
      dispatch(getAllPortfolios());
      
      return publishedPortfolio;
    } catch (error: any) {
      console.error("Failed to publish portfolio:", error);
      return rejectWithValue(error.message || "Failed to publish portfolio");
    }
  }
);

export const deleteDraft = createAsyncThunk(
  "portfolio/delete",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const result = await remove(id);
      console.log("Portfolio deleted successfully:", id);
      
      // Clear cache and refresh portfolios after successful deletion
      await clearCache();
      dispatch(getAllPortfolios());
      
      return result;
    } catch (error: any) {
      console.error("Failed to delete portfolio:", error);
      return rejectWithValue(error.message || "Failed to delete portfolio");
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
          state.layout = action.payload; // Update the current layout with the saved data
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
      .addCase(getAllPortfolios.fulfilled, (state, action) => {
        state.loading = false;
        // Store the portfolios in state for future reference
        state.portfolios = action.payload;
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
