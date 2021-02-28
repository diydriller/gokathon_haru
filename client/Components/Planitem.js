import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../Container/Redux/actions/index";

const { width, height } = Dimensions.get("window");

const BASE_URL = "https://evensunshine.herokuapp.com/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY1ZjNjNDgxZTg0YzAwMTcyOGE2M2QiLCJpYXQiOjE2MDk5NTQyNTN9.1MGab_D_Nn0gvCX53Fxpxgflhv_7mBTOWE-UQpb9odY";

// 여기다 두는 이유는, render할 때마다, 이 이벤트 리스너 함수들이 초기화 되는 걸 막기위해서.
let deleteHandler = async () => {};
let finishBtnHandler = async () => {};
let lockBtnHandler = async () => {};

const Planitem = (props) => {
  //여기서 plan은 배열을 받아서 배열이 아무것도 없는 것 : 하나라도 있는 것 경우로 나눠야함.
  if (props.plan === undefined) return null;
  const plan = props.plan;
  const {
    _id,
    title,
    like,
    userId,
    createdAt,
    isFinished,
    isLocked,
    __v,
  } = plan;
  const [Finished, setFinished] = useState(isFinished); //일단 인자로 받은 isFinished를 react hook Finished에 저장해둔다.
  const [Locked, setLocked] = useState(isLocked); //일단 인자로 받은 isFinished를 react hook Finished에 저장해둔다.

  useEffect(() => {
    // 최초 마운트 시, 한 번만 이벤트 핸들러 함수와, props를 정의.
    deleteHandler = async (_id, title) => {
      props.deletePlanItem(_id); //Redux에 해당 _id를 알린다.
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = {
        planId: _id,
      };
      await axios
        .post(BASE_URL + "plan/deletePlan", data, config) // 그 다음 서버에서도 지운다.
        .then((res) => {
          console.log(`${title}를 서버에 제거상태 수정 : `, res.data.success);
        })
        .catch((err) => {
          Alert.alert("There was an Error.");
          console.log("Error like this", err);
        });
    };
    finishBtnHandler = async (id, title) => {
      props.finishPlanItem(id);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = {
        planId: id,
        isFinished: !Finished, // 컴포넌트가 만들어질 때 받은 인자인 Finished를 토글해서 서버로 보낸다.
      };
      await axios
        .post(BASE_URL + "plan/updateFinish", data, config)
        .then((res) => {
          console.log(
            `${title} id : ${id}를 서버에 완료상태 수정 : `,
            res.data.success
          );
        })
        .catch((err) => {
          Alert.alert("There was an Error.");
          console.log("Error like this", err);
        });
    };
    lockBtnHandler = async (id, title) => {
      props.lockPlanItem(id);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = {
        planId: id,
        isLocked: !Locked, // 컴포넌트가 만들어질 때 받은 인자인 Finished를 토글해서 서버로 보낸다.
      };
      await axios
        .post(BASE_URL + "plan/updateLock", data, config)
        .then((res) => {
          console.log(`${title}를 서버에 잠금상태 수정 : `, res.data.success);
        })
        .catch((err) => {
          Alert.alert("There was an Error.");
          console.log("Error like this", err);
        });
    };
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 5,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View style={{}}>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>{plan.title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => deleteHandler(_id, title)}
          style={{ paddingLeft: 10 }}
        >
          <Image
            source={require("../assets/images/ex.png")}
            style={{ width: 15, height: 15 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.btnContainer}>
        {/* LOCK 버튼 */}
        {isLocked ? (
          <TouchableOpacity onPress={() => lockBtnHandler(_id, title)}>
            <Ionicons size={20} name="lock-closed-outline" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => lockBtnHandler(_id, title)}>
            <Ionicons size={20} name="person-circle-outline" />
          </TouchableOpacity>
        )}

        {/* 완료하기 버튼  */}
        {isFinished ? (
          <TouchableOpacity
            onPress={() => finishBtnHandler(_id, title)}
            style={{ ...styles.finishBtn, backgroundColor: "tomato" }}
            activeOpacity={0.1}
          >
            <Text style={{ color: "#FFF", fontWeight: "bold" }}>
              축하합니다!!
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.finishBtn}
            onPress={() => finishBtnHandler(_id, title)}
            activeOpacity={0.8}
          >
            <Text style={{ color: "#FFF", fontWeight: "bold" }}>완료</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    backgroundColor: "#fff",
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    borderRadius: 20,
    width: width * 0.43,
    height: height * 0.19,
    justifyContent: "space-between",
    alignContent: "center",
  },
  btnContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  finishBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: "73%",
    height: 30,
    backgroundColor: "#74B9FF",
    borderRadius: 15,
  },
  // lockBtn: {
  //     height: 30,
  //     backgroundColor: "#ccc",
  // }
});

const mapDispatchToProps = (dispatch) => {
  return {
    deletePlanItem: (_id) => dispatch(actions.deletePlanItem(_id)),
    finishPlanItem: (_id) => dispatch(actions.finishPlanItem(_id)),
    lockPlanItem: (_id) => dispatch(actions.lockPlanItem(_id)),
  };
};

export default connect(null, mapDispatchToProps)(Planitem);
