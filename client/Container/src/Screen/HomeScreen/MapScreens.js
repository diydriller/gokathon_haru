import React, { useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Modals from "../../../../Components/Modals";
import axios from "axios";
import { io } from "socket.io-client";
import CardItem from "../../../../Components/CardItem";
import { stopClock } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 100;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 50;

const BASE_URL = "https://evensunshine.herokuapp.com/";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY3MGQ0YWE3MDk3NzAwMTc3MzI2NjIiLCJpYXQiOjE2MTAyMTgyMzJ9.aSFScs4eVIZZ75zMIkO1eL134aJS_OYf4n8GKXDfTqY";
//   토큰으로 안하기로 했음.

const socket = io(BASE_URL + "map");

const MapScreens = (props) => {
  const initialMapstate = {
    markers: [],
    region: {
      //내 현재 위치가 담길 region
      latitude: 37.58276,
      longitude: 127.03076,
      latitudeDelta: 0.007864195044303443,
      longitudeDelta: 0.0070142817690068,
    },
  };

  const [location, setLocation] = React.useState(initialMapstate);

  useEffect(() => {
    async function WatchLocation() {
      try {
        // 유저에게 위치추적 여부묻기.
        await Location.requestPermissionsAsync(); // 유저에게 위치 요청 보내기.
      } catch (err) {
        console.log("Error like this : ", err);
        Alert.alert(
          "위치 허용을 활성화 해주세요.",
          "하루는 고객님의 위치기반 서비스입니다."
        );
        return null; // 홈 화면으로 라우팅
      }
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
        },
        (location) => {
          console.log("Keep watching");
          const { latitude, longitude } = location.coords; // 실 시간 유저 위치.
          // 여기까지는 expo Location으로 현위치 가져옴.

          socket.emit("position", {
            latitude: latitude,
            longtitude: longitude, // 현종님의 스펠 실수. longitude (x) => longtitude (o) 이걸로하기.
            _id: "5ff70d4aa709770017732662", // 추후에 변경해야함.
          });
          socket.on("user", (FetchedArr) => {
            setLocation({
              markers: FetchedArr, //  친구들 위치.
              region: {
                // 내 위치
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.007864195044303443,
                longitudeDelta: 0.0070142817690068,
              },
            });
            console.log("소켓을 통해 새롭게 랜더링");
          });
        }
      ); // watchPosition 함수.
    }
    WatchLocation();
    return () => socket;
  }, []);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= location.markers.length) {
        index = location.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { region } = location.markers[index]; // 현종님이 region으로 바꾼다면  region: {latitude, longitude}
          _map.current.animateToRegion(
            {
              latitude: region.latitude,
              longitude: region.longtitude, // 현종님 실수
              latitudeDelta: 0.007864195044303443,
              longitudeDelta: 0.0070142817690068,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = location.markers.map((_, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        style={styles.map}
        provider="google"
        showsUserLocation={true} // 현 위치가 파란색 원으로 표시됨.
        showsMyLocationButton={true} // 현 위치로 가는 버튼
        followsUserLocation={true}
        initialRegion={location.region}
      >
        {location.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          const { latitude, longtitude } = marker.region; //현종님 실수
          return (
            <Marker
              key={index}
              coordinate={{ latitude, longitude: longtitude }}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require("../../../../assets/images/map_marker.png")}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.ScrollView}
        snapToInterval={CARD_WIDTH + 30}
        snapToAlignment="center"
        decelerationRate="fast"
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET + 15,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {/* Map에 있는 카드 => 서버에서 받은 내 주변 arroundFriends 배열 */}
        {location.markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <CardItem
              key={index}
              marker={marker}
              isFollowing={marker.isFollowing}
              navigation={props.navigation}
            />
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ScrollView: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 30,
    marginHorizontal: 20,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  cardImage: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 100,
    width: CARD_WIDTH * 0.25,
    height: CARD_HEIGHT * 0.6,
  },
  textContent: {
    flex: 1,
  },
  cardDisplayName: {
    fontSize: 17,
    textAlign: "center",
    color: "#999",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  cardDistance: {
    fontSize: 11,
    color: "#ccc",
  },
  followBtn: {
    flex: 0.4,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#74B9FF",
    color: "#fff",
    borderRadius: 20,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 60,
  },
  marker: {
    width: 35,
    height: 35,
  },
  map: {
    width: width,
    height: height - 170,
  },
});

export default MapScreens;
