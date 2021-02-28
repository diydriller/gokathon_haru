import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import axios from "axios";
function DetailThemeScreen() {
  const loadToken = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY3MGQ0YWE3MDk3NzAwMTc3MzI2NjIiLCJpYXQiOjE2MTAyMTgyMzJ9.aSFScs4eVIZZ75zMIkO1eL134aJS_OYf4n8GKXDfTqY";
    var data = JSON.stringify({ title: "30분 달리기" });

    var config = {
      method: "post",
      url: "https://evensunshine.herokuapp.com/plan/register",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView>
        <View style={{ backgroundColor: "white" }}>
          <Image
            source={require("../../../../../assets/images/1-1.png")}
            style={{ width: "100%", resizeMode: "cover", height: 230 }}
          />
          <Image
            source={require("../../../../../assets/images/running.png")}
            style={{ width: "100%", height: 350, resizeMode: "contain" }}
          />
        </View>
        <View style={{ flex: 1, alignItems: "center", marginBottom: 50 }}>
          <TouchableOpacity
            style={{
              width: 150,
              height: 50,
              backgroundColor: "#4EBBF2",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
            }}
            onPress={() => loadToken()}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              목표 추가
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailThemeScreen;
