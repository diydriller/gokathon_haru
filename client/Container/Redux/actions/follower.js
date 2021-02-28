export const FETCH_FOLLOWERS = "FETCH_FOLLOWERS";

import AsyncStorage from "@react-native-community/async-storage";

const BASE_URL = "https://evensunshine.herokuapp.com";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY3MGQ0YWE3MDk3NzAwMTc3MzI2NjIiLCJpYXQiOjE2MTAyMTgyMzJ9.aSFScs4eVIZZ75zMIkO1eL134aJS_OYf4n8GKXDfTqY";
export const getMate = () => {
  return async (dispatch) => {
    const result = await fetch(`${BASE_URL}/mate/getMate`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await result.json();
    if (response.success) {
      console.log('getMate success!');
      // console.log('mate response : ', response.mate);
      dispatch({
        type: FETCH_FOLLOWERS,
        payload: response.mate,
      });
    }
    // 실패 시 처리도 해야함.
    return {
      type: FETCH_FOLLOWERS,
      payload: response.mate,
    };
  };
};
