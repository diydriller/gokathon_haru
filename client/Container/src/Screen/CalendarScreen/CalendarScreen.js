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
import AppLoading from "expo-app-loading";
import FadeInView from '../../../../Components/FadeInView';

// import DATA from "../HomeScreen/dummyData2";
import DATA2 from "./dummy";

function CalendarScreen() {
  const nowTime = moment().format("YYYY-MM-DD");
  console.log(nowTime);

  const [selectedDay, setSelectedDay] = useState(nowTime);
  const [Data, setData] = useState();
  const [Cheer, setCheer] = useState();

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
    var config2 = {
      method: "get",
      url: "https://evensunshine.herokuapp.com/mate/getCheer",
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
    axios(config2)
      .then(function (response) {
        console.log(JSON.stringify(response.data.cheer_mate));
        setCheer(response.data.cheer_mate);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    loadData();
  }, []);
  console.log("plan:", Data);
  console.log("cheer:", Cheer);
  if (Data && Cheer) {
    return (
        <View style={styles.container}>
          <SafeAreaView style={{ flexDirection: "column", width: "100%" }}>
            <View style={styles.logoBar}>
              <Text style={styles.logoText}>월간 플래너</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ paddingBottom: 70 }}>
                <View style={{}}>
                  <Calendar
                    style={{
                      borderRadius: 10,
                      margin: 20,
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3,
                    }}
                    current={"2021-01-10"}
                    onDayPress={(day) => {
                      console.log("selected day", day);
                      setSelectedDay(day.dateString);
                    }}
                    monthFormat={"yyyy MM"}
                    onMonthChange={(month) => {
                      console.log("month changed", month);
                    }}
                    hideArrows={false}
                    renderArrow={(direction) =>
                      direction === "left" ? (
                        <Image
                          source={require("../../../../assets/images/left.png")}
                          style={{ width: 20, height: 20 }}
                        />
                      ) : (
                        <Image
                          source={require("../../../../assets/images/right.png")}
                          style={{ width: 20, height: 20 }}
                        />
                      )
                    }
                    hideExtraDays={true}
                    firstDay={7}
                    enableSwipeMonths={true}
                    markedDates={{
                      [selectedDay]: {
                        selected: true,
                        selectedDayBackgroundColor: "#74B9FF",
                      },
                    }}
                  />
                </View>
                <View>
                  <Text style={{ marginHorizontal: 20 }}>이 날의 달성</Text>
                  {/* <Text style={{ marginHorizontal: 20 }}>{selectedDay}</Text> */}
                  {Data.map((item, index) => {
                    const d = item.createdAt;
                    const subdate = d.substring(0, 10);
                    if (subdate === selectedDay) {
                      return (
                        <FadeInView>
                          <View
                            key={index}
                            style={{ flex: 1, alignItems: "center" }}
                          >
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
                              <View
                                style={{
                                  flex: 1,
                                  alignItems: "center",
                                  justifyContent: "center",
                                  height: 30,
                                }}
                              >
                                <Text style={{ alignContent: "center" }}>
                                  {item.title}
                                </Text>
                                {/* <View
                                  style={{ marginTop: 25, flexDirection: "row" }}
                                >
                                  <Image
                                    style={{ height: 23, width: 23 }}
                                    source={require("../../../../assets/images/heart.png")}
                                  />
                                </View> */}
                              </View>
                            </View>
                          </View>
                        </FadeInView>
                      );
                    }
                  })}

                  <Text style={{ marginLeft: 20, marginTop: 20 }}>
                    내가 받은 응원
                  </Text>
                  {Cheer.map((item, index) => (
                    <FadeInView>
                      <View key={index} style={{ flex: 1, alignItems: "center" }}>
                        <View style={{ flexDirection: "row", margin: 10 }}>
                          <Image
                            // source={item.cheer.image}
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
                            <Text style={{}}>{item.cheer.message}</Text>
                          </View>
                        </View>
                      </View>
                    </FadeInView>
                  ))}
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      );
    } else {
      return (
        <FadeInView>
          <View>
            <AppLoading />
          </View>
        </FadeInView>
      );
  }
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  story: {
    flex: 1,
    marginTop: 5,
    alignItems: "center",
  },
  logoBar: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#aaa",
  },
});

export default CalendarScreen;
