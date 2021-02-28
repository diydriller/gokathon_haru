import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import FadeInView from '../../../../Components/FadeInView';

function CommunityScreen() {
  const [Data, setData] = useState();

  const loadData = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY3MGQ0YWE3MDk3NzAwMTc3MzI2NjIiLCJpYXQiOjE2MTAyMTgyMzJ9.aSFScs4eVIZZ75zMIkO1eL134aJS_OYf4n8GKXDfTqY";
    var axios = require("axios");
    var config = {
      method: "get",
      url: "https://evensunshine.herokuapp.com/mypage/getComment",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(config)
      .then(function (response) {
        setData(response.data.comments);
        console.log(response.data.comments);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    loadData();
  }, []);

  const Item = ({ item }) => {
    if (item.commentImage === "noImage") {
      return (
        <View style={{}}>
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: `${item.profileImage}` }}
                style={{ width: 20, height: 20 }}
              />
              <Text style={{ marginLeft: 5 }}>{item.displayName}님</Text>
            </View>
            <Text
              style={{ marginVertical: 10, fontSize: 18, fontWeight: "700" }}
            >
              {item.title}
            </Text>
            <Text>{item.comment}</Text>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 300,
                marginBottom: 10,
              }}
            >
              <Image
                source={require("../../../../assets/images/heart.png")}
                style={{ width: 30, height: 30 }}
              />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 5,
              backgroundColor: "#D8D8D8",
            }}
          ></View>
        </View>
      );
    } else {
      return (
        <FadeInView>
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: `${item.profileImage}` }}
                style={{ width: 20, height: 20 }}
              />
              <Text style={{ marginLeft: 5 }}>{item.displayName}님</Text>
            </View>

            <View style={{ marginTop: 10, flex: 1, alignItems: "center" }}>
              <Image
                source={{ uri: `${item.commentImage}` }}
                style={{ width: 340, height: 340 }}
              />
            </View>

            <Text
              style={{ marginVertical: 10, fontSize: 18, fontWeight: "700" }}
            >
              {item.title}
            </Text>
            <Text>{item.comment}</Text>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 300,
                marginBottom: 10,
              }}
            >
              {/* <Text style={{ marginVertical: 10, fontSize: 10 }}>
              하트를 눌러 응원해주세요!
            </Text> */}
              <Image
                source={require("../../../../assets/images/heart.png")}
                style={{ width: 30, height: 30 }}
              />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 5,
              backgroundColor: "#D8D8D8",
            }}>
          </View>
        </FadeInView>
      );
    }
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={{ alignItems: "center", backgroundColor: "white" }}>
        <Image
          source={require("../../../../assets/images/search2.png")}
          style={{
            width: 330,
            resizeMode: "stretch",
            height: 50,
            marginTop: 40,
          }}
        />
      </View>

      <FadeInView>
        <ScrollView>
          <View style={{ paddingBottom: 100 }}>
            <View
              style={{
                width: "100%",
                height: 5,
                backgroundColor: "#D8D8D8",
                marginTop: 7,
              }}
            ></View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                margin: 20,
                marginHorizontal: 40,
                marginBottom: 35,
              }}
            >
              목표 후기
            </Text>
            <FlatList
              data={Data}
              renderItem={Item}
              keyExtractor={(item) => item._id}
            />
          </View>
        </ScrollView>
      </FadeInView>
    </View>
  );
}

export default CommunityScreen;
