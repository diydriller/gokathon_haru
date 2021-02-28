import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import RecentScreen from "./Sections/RecentScreen";

import POPDATA from "./Sections/PopularData";
import DATA from "./Sections/ThemeData";
import FadeInView from '../../../../Components/FadeInView';

function RecommendationScreen(props) {
  const popPlan = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          width: 160,
          height: 250,
          marginHorizontal: 6,
        }}
      >
        <Image
          source={item.image}
          style={{ height: 140, width: 160, resizeMode: "stretch" }}
        />
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              marginVertical: 10,
              lineHeight: 20,
            }}
          >
            {item.title}
          </Text>

          <Text style={{ fontSize: 11, color: "#B7B7B7", lineHeight: 15 }}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };
  const themePlan = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("DetailTheme")}
      >
        <View style={{ marginTop: 10 }}>
          <View style={{ marginLeft: 30, flexDirection: "row" }}>
            <View style={{ width: 220 }}>
              <Text
                style={{ marginVertical: 5, fontSize: 15, fontWeight: "600" }}
              >
                {item.title}
              </Text>
              <Text style={{ color: "#B7B7B7", fontSize: 13 }}>
                {item.category}
              </Text>

              <Text style={{ color: "#B7B7B7", marginTop: 10, fontSize: 13 }}>
                {item.description}
              </Text>
            </View>

            <Image
              source={item.image}
              style={{
                width: 80,
                height: 80,
                marginLeft: 20,
                marginRight: 10,
                marginBottom: 7,
                borderRadius: 20,
              }}
            />
          </View>

          <View
            style={{
              width: "100%",
              height: 5,
              backgroundColor: "#EDEDED",
              marginTop: 2,
            }}
          ></View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FadeInView duration={1000}>
      <View style={{ backgroundColor: "white", alignItems: "center" }}>
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
          <View
            style={{
              width: "100%",
              height: 5,
              backgroundColor: "#D8D8D8",
            }}
          ></View>
        </View>
        <ScrollView style={{}} showsHorizontalScrollIndicator={false}>
          <View style={{ paddingBottom: 100 }}>
            <View>
              <View
                style={{
                  width: "100%",
                  height: 5,
                  backgroundColor: "#D8D8D8",
                  marginTop: 2,
                }}
              ></View>
              <Text
                style={{
                  marginHorizontal: 30,
                  marginVertical: 20,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                인기 목표
              </Text>
              <View style={{ marginHorizontal: 5 }}>
                <FadeInView duration={2000}>
                  <FlatList
                    data={POPDATA}
                    renderItem={popPlan}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                  />
                </FadeInView>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 5,
                  backgroundColor: "#D8D8D8",
                  marginTop: 2,
                }}
              ></View>
              <View style={{ marginTop: 15, marginLeft: 30 }}>
                <Text style={{ color: "#B7B7B7", marginBottom: 3 }}>
                  오늘의 추천
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  테마별 목표
                </Text>
              </View>

              <View style={{ marginTop: 15 }}>
                <FlatList
                  data={DATA}
                  renderItem={themePlan}
                  keyExtractor={(item) => item.id}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </FadeInView>
  );
}

export default RecommendationScreen;
