import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  resetForgottenPassword,
  sendOtpEmail,
  verify,
} from "../api/auth";
import { getUserId } from "@/lib/utils";
import { removeUser, updateUser } from "../api/profile";

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await registerUser(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const update = createAsyncThunk(
  "user/update",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await updateUser(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "user/delete",
  async (_, { rejectWithValue }) => {
    try {
      const response = await removeUser();
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await verify(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await loginUser(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const googleLogin = createAsyncThunk<any, void, { rejectValue: any }>(
  "auth/google/login",
  async (_, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      const popup = window.open(
        "http://localhost:3001/auth/google",
        "_blank",
        "width=500,height=600"
      );

      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== "http://localhost:3001") return;

        window.removeEventListener("message", handleMessage);

        if (event.data.success) {
          resolve(event.data);
        } else {
          reject(rejectWithValue(event.data));
        }

        popup?.close();
      };

      window.addEventListener("message", handleMessage);

      if (!popup) {
        return rejectWithValue({
          message: "Allow popups to continue with Google login.",
        });
      }
    });
  }
);

export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await sendOtpEmail(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetForgetPassword",
  async (data: ForgotPassword, { rejectWithValue }) => {
    try {
      const response = await resetForgottenPassword(data);
      return response.success;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string }).message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(update.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify({ ...action.payload }));
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string }).message;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string }).message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        const id = getUserId(action.payload.data.access_token);
        localStorage.setItem("token", action.payload.data.access_token);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...action.payload.data })
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string }).message;
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        const { data } = action.payload;

        const { access_token, ...rest } = data;

        state.token = access_token;
        state.user = {
          ...rest,
        };

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string }).message;
      })
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.loading = false;
        const { message, user } = action.payload;
        if (user.is_emailVerified) localStorage.setItem("verified", "true");
        else localStorage.setItem("verified", "false");
        localStorage.setItem("email", user.email);
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string }).message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string }).message;
      })
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as { message: string }).message;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
