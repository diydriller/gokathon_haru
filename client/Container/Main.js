import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/Screen/HomeScreen/HomeScreen";
import RecommendationScreen from "./src/Screen/RecommendationScreen/RecommendationScreen";
import CalendarScreen from "./src/Screen/CalendarScreen/CalendarScreen";
import MyPageScreen from "./src/Screen/MyPageScreen/MyPageScreen";
import LoginScreen from "./src/Screen/LoginScreen/LoginScreen";
import RegisterScreen from "./src/Screen/RegisterScreen/RegisterScreen";

import CheerUpScreen from "./src/Screen/HomeScreen/CheerUpScreen";
import DetailThemeScreen from "./src/Screen/RecommendationScreen/Sections/DetailThemeScreen";

import FollowerScreen from "./src/Screen/HomeScreen/FollowerScreen";
import SplashScreen from "./src/Screen/SplashScreen/SplashScreen";
import SettingPlan from "./src/Screen/HomeScreen/SettingPlan";
import Backdrop from "../Components/Backdrop";
import MapScreens from "./src/Screen/HomeScreen/MapScreens";

import CommunityScreen from "./src/Screen/CommunityScreen/CommunityScreen";
const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Follower" component={FollowerScreen} />
      <Stack.Screen
        name="SettingPlan"
        component={SettingPlan}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MapScreens" component={MapScreens} />
      <Stack.Screen name="CheerUp" component={CheerUpScreen} />
    </Stack.Navigator>
  );
};

const RecommendationTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Recommendation"
        component={RecommendationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailTheme"
        component={DetailThemeScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

function mainFlow() {
  return (
    <BottomTab.Navigator tabBarOptions={{ showLabel: false }}>
      <BottomTab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/images/b_1_.png")
                  : require("../assets/images/b_1.png")
              }
              style={{
                width: 50,
                height: 50,
              }}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="RecommendationTab"
        component={RecommendationTab}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/images/b_2_.png")
                  : require("../assets/images/b_2.png")
              }
              style={{
                width: 50,
                height: 50,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/images/b_5_.png")
                  : require("../assets/images/b_5.png")
              }
              style={{
                width: 50,
                height: 50,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/images/b_3_.png")
                  : require("../assets/images/b_3.png")
              }
              style={{
                width: 50,
                height: 50,
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/images/b_4_.png")
                  : require("../assets/images/b_4.png")
              }
              style={{
                width: 50,
                height: 50,
              }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function Main() {
  //은비님 코드의 App 컴포넌트 입니다. 이렇게 한 이유는 제 App 컴포넌트에는 Redux하기 위함입니다.
  return (
    <>
      <Backdrop />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="mainFlow"
            component={mainFlow}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
