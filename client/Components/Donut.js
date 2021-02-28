import * as React from "react";
import {
  Easing,
  TextInput,
  Animated,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Svg, { G, Circle, Rect } from "react-native-svg";
import FadeInView from "./FadeInView";
import ElsaticView from "./ElasticView";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function Donut({
  percentage = 0,
  radius = 110,
  strokeWidth = 20,
  duration = 500,
  color = "#209CFF",
  delay = 0,
  textColor,
  max = 100,
}) {
  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue) => {
    return Animated.timing(animated, {
      delay: 1000,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  React.useEffect(() => {
    animation(percentage);
    animated.addListener(
      (v) => {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circumference - (circumference * maxPerc) / 100;
        if (inputRef?.current) {
          inputRef.current.setNativeProps({
            text: `${Math.round(v.value)}%`,
          });
        }
        if (circleRef?.current) {
          circleRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [max, percentage]
    );

    return () => {
      animated.removeAllListeners();
    };
  });

  // if(percentage === 100) {
  //   strokeWidth = 300
  // }
  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      {percentage !== 100 ? (
        <>
          <Svg
            height={radius * 2}
            width={radius * 2}
            viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
          >
            <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
              <Circle
                ref={circleRef}
                cx="50%"
                cy="50%"
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDashoffset={circumference}
                strokeDasharray={circumference}
              />
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                strokeOpacity=".1"
                style={{
                  shadowColor: "#333",
                  shadowOpacity: 0.4,
                  shadowOffset: { width: 0, height: 5 },
                  shadowRadius: 5,
                }}
              />
            </G>
          </Svg>
          <AnimatedTextInput
            ref={inputRef}
            underlineColorAndroid="transparent"
            editable={false}
            style={[
              StyleSheet.absoluteFillObject,
              { fontSize: radius / 2, color: textColor ?? color },
              styles.text,
            ]}
          />
        </>
      ) : (
        // 100 퍼센트 채웠으면 도창이 뜬다.
        <ElsaticView duration={2000} ela={7}>
          <TouchableOpacity //이 도장을 찍기위해서는 적어도 한 목표당 1시간씩은 지나야함.
            style={{ position: "relative", right: 10, top: -30 }}
            onPress={() =>
              Alert.alert(
                "도장이 한 개 적립되었습니다!",
                "도장은 플래너에서 확인할 수 있습니다^^"
              )
            }
          >
            <Image
              style={{
                justifyContent: "center",
                alignSelf: "center",
                width: 300,
                height: 280,
                overflow: "visible",
              }}
              source={require("../assets/images/approved.png")}
            />
          </TouchableOpacity>
        </ElsaticView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    marginBottom: 15,
    color: "black",
    fontWeight: "400",
    fontSize: 25,
  },
});
