export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
const BASE_URL = "https://evensunshine.herokuapp.com";
export const registerUser = (authData) => {
  const { email, displayName, password } = authData;
  return async (dispatch) => {
    const result = await fetch(`${BASE_URL}/auth/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        displayName,
        password,
      }),
    });
    const resultData = await result.json();
    console.log("userdata:", resultData);
    if (resultData.success) {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: resultData,
      });
    }
    return {
      type: REGISTER_USER_SUCCESS,
      payload: resultData,
    };
  };
};
export const loginUser = (authData) => {
  const { email, password } = authData;
  return async (dispatch) => {
    const result = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const resultData = await result.json();
    if (resultData.success) {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: resultData,
      });
    }
    return {
      type: LOGIN_USER_SUCCESS,
      payload: resultData,
    };
  };
};
