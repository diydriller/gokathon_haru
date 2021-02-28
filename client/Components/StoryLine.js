import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { useSelector, shallowEqual } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UnKnownFriend } from "../Model/UnKnownFriend";
import FadeInView from "./FadeInView";

const StoryLine = (props) => {
  // REDUX_follower 변화 감지,
  const REDUX_follower = useSelector(
    (state) => state.FollowerReducer.follower,
    shallowEqual
  );

  useEffect(() => {
    console.log("리덕스 팔로워가 바뀌었습니다 : ", REDUX_follower);
  }, [REDUX_follower]);

  return (
    <FadeInView>
      <ScrollView
        horizontal
        contentContainerStyle={{
          justifyContent: "space-around",
          paddingHorizontal: 5,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row" }}>
          {/* 스토리 가장 첫번째. 둘러보기 => MapScreen으로 감. */}
          <TouchableOpacity
            style={styles.story}
            activeOpacity={0.8}
            onPress={() => {
              props.navigation.navigate("MapScreens");
            }}
          >
            <Image
              source={require("../assets/images/addMyProfile.png")}
              style={{ ...styles.storyImage, borderWidth: 0 }}
            />
            <Text style={styles.storyText}>팔로워 찾기</Text>
          </TouchableOpacity>

          {REDUX_follower.length === 0 ? (
            <UnKnownFriend navigation={props.navigation} />
          ) : (
            REDUX_follower.map((
              friend,
              index // 여기도 나를 제외, mate만 열거해야함.
            ) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.story}
                  activeOpacity={0.8}
                  onPress={() => {
                    props.navigation.navigate("Follower", {
                      _id: friend._id,
                      profileImage: friend.profileImage,
                      displayName: friend.displayName,
                    });
                  }}
                >
                  <Image
                    key={index}
                    source={{
                      uri: `${friend.profileImage}`,
                    }}
                    style={styles.storyImage}
                  />
                  <Text style={styles.storyText}>{friend.displayName}</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  story: {
    flex: 1,
    marginTop: 5,
    alignItems: "center",
  },
  storyImage: {
    width: 50,
    height: 50,
    borderRadius: 120,
    borderWidth: 3,
    borderColor: "#74B9FF",
    marginLeft: 10,
  },
  storyText: {
    fontSize: 11,
    marginLeft: 10,
  },
});

export default StoryLine;
