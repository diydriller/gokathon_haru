import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";

function SplashScreen({ navigation }) {
  return (
    <View>
      <ImageBackground
        source={require("../../../../assets/images/splash2.png")}
        style={{ width: "100%", height: "100%", justifyContent: "center" }}
      >
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => navigation.navigate("Login")}
        >
          <Image
            source={require("../../../../assets/images/logo3.png")}
            style={{ width: 100, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default SplashScreen;
