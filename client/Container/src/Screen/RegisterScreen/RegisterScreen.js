import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import * as authAction from "../../../Redux/actions/authAction";

const formSchema = yup.object({
  displayName: yup.string().required().min(3),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

function RegisterScreen(props) {
  const { navigation } = props;
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Formik
        initialValues={{
          email: "",
          displayName: "",
          password: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          dispatch(authAction.registerUser(values))
            .then(async (result) => {
              console.log(result);
              if (result.payload.success) {
                try {
                  console.log("hi");
                  navigation.navigate("Login");
                } catch (err) {
                  console.log(err);
                  Alert.alert("에러");
                }
              } else {
                Alert.alert("회원가입 실패");
              }
            })
            .catch((err) => console.log(err));
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <View style={styles.logo}>
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../../../../assets/images/logo2.png")}
              />
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="이메일"
                placeholderTextColor="#A4A4A4"
                keyboardType="email-address"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
              />
              {/* <Text style={styles.error}>
                {props.touched.email && props.errors.email}
              </Text> */}
              <TextInput
                style={styles.input}
                placeholder="이름"
                placeholderTextColor="#A4A4A4"
                onChangeText={props.handleChange("displayName")}
                value={props.values.displayName}
                onBlur={props.handleBlur("displayName")}
              />
              {/* <Text style={styles.error}>
                {props.touched.fullName && props.errors.fullName}
              </Text> */}
              <TextInput
                style={styles.input}
                placeholder="비밀번호"
                placeholderTextColor="#A4A4A4"
                secureTextEntry={true}
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
              />
              <Text style={styles.error}>
                {props.touched.password && props.errors.password}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}
              >
                <Text style={styles.buttonText}>회원가입</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>이미 계정이 있나요?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.registerButton}>로그인하러가기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    alignItems: "center",
    marginBottom: 40,
  },
  image: {
    width: 100,
    height: 100,
  },
  input: {
    width: 300,
    backgroundColor: "#F2F2F2",
    borderRadius: 25,
    padding: 16,
    fontSize: 16,
    marginVertical: 10,
    color: "#6E6E6E",
  },
  button: {
    width: 300,
    backgroundColor: "#4ebbf2",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
  },
  registerContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row",
  },
  registerText: {
    color: "#738289",
    fontSize: 16,
  },
  registerButton: {
    color: "#738289",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
});

export default RegisterScreen;
