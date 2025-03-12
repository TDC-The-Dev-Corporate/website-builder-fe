import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createPortfolio } from "../api/portfolio";

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
    return rejectWithValue(
      error.response?.data || "Failed to create portfolio"
    );
  }
});

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
      });
  },
});

export const portfolioReducer = portfolioSlice.reducer;
