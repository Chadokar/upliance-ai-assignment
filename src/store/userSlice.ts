import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

interface UserState {
  userData: UserData | null;
  editorContent: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
}

const initialState: UserState & AuthState = {
  userData: null,
  editorContent: "",
  isAuthenticated: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    setEditorContent: (state, action: PayloadAction<string>) => {
      state.editorContent = action.payload;
    },
    login: (state, action: PayloadAction<UserData>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setUserData, setEditorContent, login, logout } =
  userSlice.actions;
export default userSlice.reducer;
