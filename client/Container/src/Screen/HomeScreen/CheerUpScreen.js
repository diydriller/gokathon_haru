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

import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

function CheerUpScreen({ route, navigation }) {
  const { userId } = route.params;
  console.log(userId);

  const [text, setText] = useState("");
  const onSubmitHandler = async (text) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY3MGQ0YWE3MDk3NzAwMTc3MzI2NjIiLCJpYXQiOjE2MTAyMTgyMzJ9.aSFScs4eVIZZ75zMIkO1eL134aJS_OYf4n8GKXDfTqY";
    var axios = require("axios");
    var data = JSON.stringify({ userId: userId, message: text });

    var config = {
      method: "post",
      url: "https://evensunshine.herokuapp.com/mate/registerCheer",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log("dataaaaa", JSON.stringify(response.data));
        navigation.goBack();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ padding: 30, marginTop: 10 }}>
            <Text
              style={{
                marginLeft: 5,
                marginBottom: 10,
                fontWeight: "bold",
                fontSize: 20,
                color: "#a1a6ab",
              }}
            >
              응원의 한마디
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
              onChangeText={(text) => setText(text)}
              defaultValue={text}
              placeholder="내용을 적어주세요"
              placeholderTextColor="#a1a6ab"
            />
            {text ? ( // 텍스트를 입력 받으면, "하루 설정" 버튼이 생김
              <TouchableOpacity
                onPress={() => onSubmitHandler(text)}
                style={[styles.btn, styles.setBtn]}
              >
                <Text style={styles.text}>작성 완료</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={[styles.btn, styles.cancleBtn]}
            >
              <Text style={styles.text}>취소</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

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
export default CheerUpScreen;
