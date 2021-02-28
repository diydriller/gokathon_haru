import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  LogBox,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

function FollowerScreen({ route, navigation }) {
  LogBox.ignoreAllLogs();
  const [datas, setDatas] = useState(0);
  const { followerId, displayName, profileImage } = route.params;

  const loadToken = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY3MGQ0YWE3MDk3NzAwMTc3MzI2NjIiLCJpYXQiOjE2MTAyMTgyMzJ9.aSFScs4eVIZZ75zMIkO1eL134aJS_OYf4n8GKXDfTqY";
    console.log("hi");
    var data = JSON.stringify({ userId: "5ff2bda07c06281c6410eee1" });
    var config = {
      method: "post",
      url: "https://evensunshine.herokuapp.com/mate/getMatePlan",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        // console.log("hey:", response.data.mate);
        setDatas(response.data.mate);
      })
      .catch(function (error) {
        console.log(error);
      });

    var config = {
      method: "get",
      url: "https://evensunshine.herokuapp.com/mate/getCheer",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        console.log("res : ", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    loadToken();
  }, []);

  console.log("data:", datas);

  const a = useSelector((state) => state);
  console.log("state:", a);

  const Item = ({ item }) => {
    return (
      <View style={{ flex: 0.5 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            padding: 10,
            paddingVertical: 30,
            marginVertical: 5,
            marginHorizontal: 4,
            borderRadius: 20,
            backgroundColor: "white",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,
          }}
        >
          <Text style={{ alignItems: "center" }}>{item.title}</Text>
        </View>
      </View>
    );
  };
  const Item2 = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 10,
          margin: 6,
          borderRadius: 10,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3,
          flexDirection: "row",
        }}
      >
        <Image
          source={item.image}
          style={{
            height: 60,
            width: 60,
            marginHorizontal: 10,
            borderRadius: 15,
          }}
        />
        <View style={{ marginLeft: 40 }}>
          <Text style={{ alignContent: "center" }}>{item.plan}</Text>
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
              {item.like}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (datas) {
    return (
      <View style={{ backgroundColor: "white" }}>
        <ScrollView>
          <View
            style={{
              backgroundColor: "white",
              margin: 10,
              borderRadius: 10,
              padding: 20,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                  marginRight: 20,
                }}
                resizeMode="cover"
                source={{ uri: `${profileImage}` }}
              />
              <View>
                <Text style={{ fontSize: 20 }}>{displayName}님</Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{
                      marginTop: 15,
                      backgroundColor: "#74B9FF",
                      paddingVertical: 5,
                      paddingHorizontal: 17,
                      borderRadius: 10,
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 13 }}>
                      팔로우 중
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginTop: 15,
                      marginLeft: 5,
                      backgroundColor: "#74B9FF",
                      paddingVertical: 5,
                      paddingHorizontal: 17,
                      borderRadius: 10,
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                    }}
                    onPress={() => {
                      navigation.navigate("CheerUp", {
                        userId: followerId,
                      });
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 13 }}>
                      응원의 한마디~!
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <View style={{ marginTop: 10 }}>
                {datas.length === 0 ? (
                  <Text> 목표가 없습니다.</Text>
                ) : (
                  <FlatList
                    data={datas}
                    renderItem={Item}
                    keyExtractor={(item) => item._id}
                    numColumns="2"
                    scrollEnabled={false}
                  />
                )}
              </View>
            </View>
          </View>
          <View style={{ margin: 10 }}>
            <Text
              style={{
                fontSize: 18,
                marginHorizontal: 20,
                marginBottom: 10,
              }}
            >
              {displayName} 님의 글
            </Text>
            <Image
              source={require("../../../../assets/images/222.png")}
              style={{ width: 300, height: 300, resizeMode: "contain" }}
            />
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Loading…</Text>
      </View>
    );
  }
}

export default FollowerScreen;
