import * as actionTypes from "../actions/actionTypes";

const initialState = {
  myPlan: [],
  loading: false,
  error: false,
};
// 이거 작성해야함.
const PlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PLAN_SUCCESS:
      return {
        ...state,
        myPlan: state.myPlan.concat(action.FetchedPlanArr),
        loading: false,
      };

    case actionTypes.ADD_PLAN_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADD_PLAN_SUCCESS:
      return {
        ...state,
        myPlan: state.myPlan.concat(action.newPlan),
        loading: false,
      };
    case actionTypes.ADD_PLAN_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.ADD_MY_PLAN:
      return {
        ...state,
        myPlan: state.myPlan.concat(action.planObj),
      };

    case actionTypes.DELETE_PLAN_ITEM: // 입력받은 action._id에 맞는 원소를 찾아서, 그것만 배열에서 없앤다.
      let newPlan = [...state.myPlan];
      let findItem = newPlan.find((item) => {
        // 제거 하고자하는 item을 찾고
        return item._id === action._id;
      });
      let idx = newPlan.indexOf(findItem); // store에서 이 아이템의 인덱스를 찾는다.
      newPlan.splice(idx, 1); //idx 자리 1개 지운다.

      return {
        // 원소 하나만 지우고, 원래 배열을 리턴
        ...state,
        myPlan: newPlan,
      };

    case actionTypes.FINISH_PLAN_ITEM:
      let newerPlan = [
        // 새로운 플랜 객체 생성 (Immutable 규칙 지키기 위해서. 이게 중요)
        ...state.myPlan,
      ];
      let finditem = newerPlan.find((item) => {
        return item._id === action._id;
      });
      let changed_findItem = {
        // 수정할 원소인, 객체를 만든다.
        ...finditem,
        isFinished: !finditem.isFinished, // 원래 값을 토글해서 저장.
      };
      idx = newerPlan.indexOf(finditem);
      newerPlan.splice(idx, 1, changed_findItem); // 새로운 planItem 으로 수정
      return {
        ...state,
        myPlan: newerPlan,
      };
    case actionTypes.LOCK_PLAN_ITEM:
      let newestPlan = [
        // 새로운 플랜 객체 생성 (Immutable 규칙 지키기 위해서. 이게 중요)
        ...state.myPlan,
      ];
      finditem = newestPlan.find((item) => {
        return item._id === action._id;
      });
      changed_findItem = {
        // 수정할 원소인, 객체를 만든다.
        ...finditem,
        isLocked: !finditem.isLocked, // 원래 값을 토글해서 저장.
      };
      idx = newestPlan.indexOf(finditem);
      newestPlan.splice(idx, 1, changed_findItem); // 새로운 planItem 으로 수정
      return {
        ...state,
        myPlan: newestPlan,
      };
    default:
      return state;
  }
};

export default PlanReducer;
