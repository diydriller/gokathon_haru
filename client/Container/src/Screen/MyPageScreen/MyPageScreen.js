import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import FadeInView from '../../../../Components/FadeInView';

function MyPageScreen() {
  return (
    <FadeInView>
      <View style={{ backgroundColor: "white" }}>
        <ScrollView>
          <View
            style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}
          >
            <Image
              source={require("../../../../assets/images/111.png")}
              style={{ width: "100%", resizeMode: "contain" }}
            />
          </View>
        </ScrollView>
      </View>
    </FadeInView>

  );
}

export default MyPageScreen;
