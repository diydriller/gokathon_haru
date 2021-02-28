import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
  LogBox,
  ViewComponent,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
function Cheer() {
  const nowTime = moment().format("YYYY-MM-DD");
  console.log(nowTime);

  const [selectedDay, setSelectedDay] = useState(nowTime);

  const [Cheer, setCheer] = useState();
  const loadData = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY3MGQ0YWE3MDk3NzAwMTc3MzI2NjIiLCJpYXQiOjE2MTAyMTgyMzJ9.aSFScs4eVIZZ75zMIkO1eL134aJS_OYf4n8GKXDfTqY";
    var axios = require("axios");
    var config2 = {
      method: "get",
      url: "https://evensunshine.herokuapp.com/mate/getCheer",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config2)
      .then(function (response) {
        console.log(JSON.stringify(response.data.message));
        setCheer(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    loadData();
  }, []);
  if (Cheer) {
    return (
      <View>
        {Cheer.map((item, index) => (
          <View key={index} style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: "row", margin: 10 }}>
              <Image
                // source={item.image}
                source={require("../../../../assets/images/dochi.jpg")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginRight: 20,
                }}
              />
              <View
                style={{
                  height: 50,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 250,
                  borderRadius: 10,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3,
                }}
              >
                <Text style={{}}>{item.message}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
}
export default Cheer;
