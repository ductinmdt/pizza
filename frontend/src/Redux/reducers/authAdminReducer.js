import * as types from "../actions/actionTypes";

const profileLocalStorage = JSON.parse(localStorage.getItem("userAdmin"));

const initialState = {
  profile: profileLocalStorage || {},
  isLoggIn:
    (JSON.parse(localStorage.getItem("isLogged")) &&
      profileLocalStorage?.role?.cd === "admin") ||
    false,
  isAuthenticated: profileLocalStorage?.role?.cd === "admin",
  // isAuthenticated: true,
  isLoading: false,
  notif: "",
};

export const authAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const profile = action.payload?.elements?.user;
      state = {
        profile: profile,
        isLoggIn: true,
        isAuthenticated: profile.role?.cd === "admin",
        isLoading: false,
        // notif: "Đăng nhập thành công",
      };
      localStorage.setItem("userAdmin", JSON.stringify(profile));
      localStorage.setItem(
        "accessToken",
        action.payload?.elements.access_token
      );
      localStorage.setItem("isLogged", true);
      return { ...state };
    }
    case types.GET_PROFILE_SUCCESS: {
      const profile = action.payload?.elements?.user;
      state = {
        ...state,
        profile: profile,
        isLoggIn: true,
        isAuthenticated: profile.role?.cd === "admin",
      };
      return { ...state };
    }
    case types.LOGOUT: {
      localStorage.removeItem("userAdmin");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isLogged");
      window.location.href = "/"
      return {
        profile: {},
        isLoggIn: false,
        isAuthenticated: false,
        isLoading: false,
        notif: "",
      };
    }
    case types.GET_PROFILE_FAIL: {
      return { ...initialState };
    }
    case types.LOGIN_FAIL: {
      return { ...state, isLoading: false, notif: action.payload?.message };
    }
    case types.SET_IS_LOADING: {
      return { ...state, isLoading: true };
    }

    default:
      return { ...state };
  }
};
