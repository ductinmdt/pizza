import * as types from "../actions/actionTypes";

const profileLocalStorage =  JSON.parse(localStorage.getItem('userUI'))

const initialState = {
  profile: profileLocalStorage || {},
  isLoggIn: (JSON.parse(localStorage.getItem('isLogged')) && profileLocalStorage?.role?.cd ==="user") || false,
  isAuthenticated: profileLocalStorage?.role?.cd ==="user",
  isLoading: false,
  notif: "",
};

export const authUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_UI_SUCCESS: {
      const profile = action.payload?.elements?.user;
      if (profile) {
        state = {
          profile: profile,
          isLoggIn: true,
          isAuthenticated: true,
          isLoading: false,
          // notif: 'Đăng nhập thành công'
        };
        localStorage.setItem("userUI", JSON.stringify(profile));
      } 
      
      localStorage.setItem(
        "accessToken",
        action.payload?.elements.access_token
      );
      localStorage.setItem("isLogged", true);

      return { ...state };
    }
    case types.GET_PROFILE_UI_SUCCESS: {
      const profile = action.payload?.elements?.user;
      state = {
        ...state,
        profile: profile,
        isLoggIn: true,
        isAuthenticated: profile.role?.cd === "user",
      };
      return { ...state };
    }
    case types.LOGOUT_UI: {
      localStorage.removeItem("userUI");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isLogged");
      localStorage.removeItem("pending_payments");
      window.location.href = "/"
      return {
        profile: {},
        isLoggIn: false,
        isAuthenticated: false,
        isLoading: false,
        notif: "",
      };
    }
    case types.GET_PROFILE_UI_FAIL: {
      return { ...initialState };
    }
    case types.LOGIN_UI_FAIL: {
      return { ...state, isLoading: false, notif: action.payload?.message };
    }
    case types.SET_IS_LOADING_UI: {
      return { ...state, isLoading: true };
    }

    default:
      return { ...state };
  }
};
