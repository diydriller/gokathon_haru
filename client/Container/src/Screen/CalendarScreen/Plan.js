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
function Plan() {
  const nowTime = moment().format("YYYY-MM-DD");
  console.log(nowTime);

  const [selectedDay, setSelectedDay] = useState(nowTime);
  const [Data, setData] = useState();
  const loadData = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY3MGQ0YWE3MDk3NzAwMTc3MzI2NjIiLCJpYXQiOjE2MTAyMTgyMzJ9.aSFScs4eVIZZ75zMIkO1eL134aJS_OYf4n8GKXDfTqY";
    var axios = require("axios");
    var config1 = {
      method: "get",
      url: "https://evensunshine.herokuapp.com/plan/getThisMonth",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config1)
      .then(function (response) {
        setData(response.data.plans);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    loadData();
  }, []);
  if (Data) {
    return (
      <View>
        {Data.map((item, index) => {
          const d = item.createdAt;
          const subdate = d.substring(0, 10);
          if (subdate === selectedDay) {
            return (
              <View key={index} style={{ flex: 1, alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    margin: 6,
                    borderRadius: 10,
                    width: 330,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3,
                    flexDirection: "row",
                  }}
                >
                  <View>
                    <Text style={{ alignContent: "center" }}>{item.title}</Text>
                    <View style={{ marginTop: 25, flexDirection: "row" }}>
                      <Image
                        style={{ height: 23, width: 23 }}
                        source={require("../../../../assets/images/heart.png")}
                      />
                      <Text
                        style={{
                          marginTop: 2,
                          marginLeft: 10,
                          fontSize: 13,
                        }}
                      >
                        하트 개수
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }
        })}
      </View>
    );
  }
}
export default Plan;
