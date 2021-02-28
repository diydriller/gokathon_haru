import * as actionTypes from "./actionTypes";
import axios from "axios";

const BASE_URL = "https://evensunshine.herokuapp.com/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY3MGQ0YWE3MDk3NzAwMTc3MzI2NjIiLCJpYXQiOjE2MTAyMTgyMzJ9.aSFScs4eVIZZ75zMIkO1eL134aJS_OYf4n8GKXDfTqY";

export const FetchPlan = (FetchedPlanArr) => {
  console.log("REDUX FETCHED !");
  return {
    type: actionTypes.FETCH_PLAN_SUCCESS,
    FetchedPlanArr,
  };
};
export const AddPlanStart = () => {
  return {
    type: actionTypes.ADD_PLAN_START,
  };
};

export const AddPlanSuccess = (newPlan) => {
  return {
    type: actionTypes.ADD_PLAN_SUCCESS,
    newPlan: newPlan,
  };
};
export const AddPlanFail = () => {
  return {
    type: actionTypes.ADD_PLAN_FAIL,
  };
};
// SettingPlan Screen에서 plan 추가 시에 발생하는 Action. (위 3개 액션과 연결)
export const AddMyPlan = (title, navigation) => {
  // token 인자도 받는 거 추후에 생각해야함.
  return (dispatch) => {
    dispatch(AddPlanStart());
    // axios.post
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      title,
    };
    axios
      .post(BASE_URL + "plan/register", data, config)
      .then((res) => {
        const {
          isFinished,
          isLocked,
          like,
          _id,
          userId,
          title,
          createdAt,
          __v,
        } = res.data.plan;
        const newPlan = {
          // ### 원래 이거 title, isFinishd, isLocked, 만 했다가 -> 리덕스 스토어와 형식 똑같이 수정 .
          __v,
          _id,
          createdAt,
          like,
          title,
          isFinished,
          isLocked,
          userId,
        };
        dispatch(AddPlanSuccess(newPlan)); //이걸 실행하면, 리덕스에 State가 바뀐다. 그럼 홈스크린에서 새로 랜더링이된다.
        navigation.navigate("Home"); // 플랜 추가 성공(새로 랜더링 했으니까)했으면 HomeScreen으로 라우팅.
      })
      .catch((_) => {
        dispatch(AddPlanFail());
      });
  };
};

export const deletePlanItem = (_id) => {
  return {
    type: actionTypes.DELETE_PLAN_ITEM,
    _id,
  };
};

export const finishPlanItem = (_id) => {
  return {
    type: actionTypes.FINISH_PLAN_ITEM,
    _id,
  };
};

export const lockPlanItem = (_id) => {
  return {
    type: actionTypes.LOCK_PLAN_ITEM,
    _id,
  };
};

export const FetchFollwer = (fetchFollwerArr) => {
  return {
    type: actionTypes.FETCH_FOLLOWER,
    fetchFollwerArr,
  }
}