import React from "react";
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

import { useSelector } from "react-redux";

import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

import * as authAction from "../../../Redux/actions/authAction";

const formSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

const LoginScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  console.log(user);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          dispatch(authAction.loginUser(values))
            .then(async (result) => {
              console.log("result:", result);
              console.log("token:", result.payload.token);
              if (result.payload.success) {
                console.log("success");
                try {
                  await AsyncStorage.setItem("token", result.payload.token);
                  navigation.navigate("mainFlow");
                } catch (err) {
                  console.log("err:", err);
                }
              } else {
                Alert.alert("로그인 실패");
                console.log("err:", result.payload);
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
                source={require("../../../../assets/images/logo4.png")}
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
                placeholder="비밀번호"
                placeholderTextColor="#A4A4A4"
                secureTextEntry={true}
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                onBlur={props.handleBlur("password")}
              />
              {/* <Text style={styles.error}>
                {props.touched.password && props.errors.password}
              </Text> */}
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}
              >
                <Text style={styles.buttonText}>로그인</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>게정이 없으신가요?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.registerButton}>회원가입하러가기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
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
    color: "#A4A4A4",
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
    color: "#ffffff",
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
    color: "gray",
  },
});

export default LoginScreen;
