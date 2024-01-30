import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: true,
    user: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    setStatus: (state, action) => {
      state.loading = action.payload;
    },
    authUser: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    addError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addUser, setStatus, authUser, addError } = userSlice.actions;
export default userSlice.reducer;

export function loginUser(values) {
  return async function loginUserThunk(dispatch, getState) {
    dispatch(setStatus(true));
    try {
      axios
        .post("/api/login", values)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            sessionStorage.setItem("user", JSON.stringify(res.data.result[0]));
            dispatch(authUser(true));
            dispatch(addUser(res.data.result[0]));
          }
          if (res.data.status === "error") {
            dispatch(addError(res.data.error));
          }
        })
        .catch((err) => console.log(err));
      dispatch(setStatus(false));
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function logoutUser() {
  return async function logoutUserThunk(dispatch, getState) {
    dispatch(setStatus(true));
    try {
      axios
        .get("/api/logout")
        .then((res) => {
          if (res.data.success) {
            sessionStorage.clear();
            dispatch(authUser(false));
            dispatch(addUser(null));
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
      dispatch(setStatus(false));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUser() {
  return async function getUserThunk(dispatch, getState) {
    dispatch(setStatus(true));
    try {
      axios
        .get("/api/me")
        .then((res) => {
          if (res.data.success) {
            dispatch(authUser(true));
            dispatch(addUser(res.data.result[0]));
          }
        })
        .catch((err) => console.log(err));
      dispatch(setStatus(false));
    } catch (error) {
      console.log(error);
    }
  };
}
