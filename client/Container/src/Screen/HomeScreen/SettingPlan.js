import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { connect, useSelector, shallowEqual } from "react-redux";
import * as actions from "../../../Redux/actions/index";

let SubmitPlanHandler = () => {};

const SettingPlan = (props) => {
  const [text, onChangeText] = useState("");
  const [isloading, setLoading] = useState(false);

  const { REDUX_loading } = useSelector(
    (state) => ({
      // Redux state가 변화하면, 변수 a에 변화한 리덕스 배열을 받는다.
      REDUX_loading: state.PlanReducer.loading,
    }),
    shallowEqual
  );

  useEffect(() => {
    setLoading(REDUX_loading);
  }, [REDUX_loading]);

  useEffect(() => {
    // Submit 이벤트 리스너를 최초 마운트 시 한번만 정의.
    SubmitPlanHandler = (title, navigation) => {
      props.AddMyPlan(title, navigation); // 리덕스 Action을 실행.
    };
  }, []);

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {REDUX_loading ? (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <ActivityIndicator
            style={styles.ActivityIndicator}
            size="large"
            color="#74B9FF"
          />
        </View>
      ) : null}
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ padding: 30, marginTop: 100 }}>
            <Text
              style={{
                marginLeft: 5,
                marginBottom: 10,
                fontWeight: "bold",
                fontSize: 20,
                color: "#a1a6ab",
              }}
            >
              하루의 목표를 알려주세요
            </Text>
            <TextInput
              style={{
                height: 120,
                padding: 10,
                fontSize: 16,
                borderRadius: 5,
                marginTop: 15,
                borderColor: "#aaa",
                borderWidth: 1,
              }}
              multiline
              maxLength={50}
              numberOfLines={5}
              onChangeText={(text) => onChangeText(text)}
              defaultValue={text}
              placeholder="하루가 도와드릴게요!"
              placeholderTextColor="#a1a6ab"
            />
            {text ? ( // 텍스트를 입력 받으면, "하루 설정" 버튼이 생김
              <TouchableOpacity
                onPress={() => SubmitPlanHandler(text, props.navigation)}
                style={[styles.btn, styles.setBtn]}
              >
                <Text style={styles.text}>하루 설정</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Home")}
              style={[styles.btn, styles.cancleBtn]}
            >
              <Text style={styles.text}>취소</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  setBtn: {
    backgroundColor: "#74B9FF",
  },
  cancleBtn: {
    backgroundColor: "#b7e3ff",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  ActivityIndicator: {
    padding: 30,
    marginTop: 30,
    position: "absolute",
    top: 150,
  },
});

const mapDispatchProps = (dispatch) => {
  return {
    AddMyPlan: (title, navigation) =>
      dispatch(actions.AddMyPlan(title, navigation)),
  };
};

export default connect(null, mapDispatchProps)(SettingPlan);
