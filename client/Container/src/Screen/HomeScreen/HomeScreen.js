import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Text,
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  LogBox,
} from "react-native";
import Planitem from "../../../../Components/Planitem";
import { connect, useSelector, shallowEqual } from "react-redux";
import * as actions from "../../../Redux/actions/index";
import axios from "axios";
import { Font } from "expo";
import Donut from "../../../../Components/Donut";
import FadeInView from "../../../../Components/FadeInView";
import StoryLine from "../../../../Components/StoryLine";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
const BASE_URL = "https://evensunshine.herokuapp.com/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY3MGQ0YWE3MDk3NzAwMTc3MzI2NjIiLCJpYXQiOjE2MTAyMTgyMzJ9.aSFScs4eVIZZ75zMIkO1eL134aJS_OYf4n8GKXDfTqY";

const { width, height } = Dimensions.get("window");
const CIRCLE_WIDTH = width * 0.5;
const CIRCLE_HEIGHT = CIRCLE_WIDTH;

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
function HomeScreen(props) {
  LogBox.ignoreAllLogs();
  let [fontsLoaded] = useFonts({
    NotoSans: require("../../../../assets/fonts/NotoSans-Regular.ttf"),
  });
  const [isloading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [CheerText, setCheerText] = useState("");
  const [refreshing, setRefresing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefresing(true);

    wait(800).then(() => setRefresing(false));
    // return () => setRefresing(false);
  }, []);

  // REDUX_plan이 바뀌는 시점 => Plan 삭제, 완료, 추가
  const { REDUX_plan } = useSelector(
    (state) => ({
      // Redux state가 변화하면, 변수 a에 변화한 리덕스 배열을 받는다.
      REDUX_plan: state.PlanReducer.myPlan,
    }),
    shallowEqual
  );

  useEffect(() => {
    // Progress Circle 계산도 해야함.
    console.log("리덕스의 Plan 스토어가 바꼈습니다.");
    const Total_Length = REDUX_plan.length; // 총 plan의 개수
    const FinishedArr = REDUX_plan.filter((plan) => plan.isFinished === true);
    const Finished_Length = FinishedArr.length;
    let percent = Math.ceil((Finished_Length / Total_Length) * 100);

    if (percent >= 0 && percent <= 15) {
      setCheerText(" 당신의 아름다운 하루를 위해 ");
    } else if (percent > 15 && percent <= 28) {
      setCheerText("이든님 좋은 출발입니다! ");
    } else if (percent > 28 && percent <= 49) {
      setCheerText("시작이 좋은데요?");
    } else if (percent > 49 && percent <= 65) {
      setCheerText("벌써 중턱이예요 믿겨지시나요?");
    } else if (percent > 66 && percent <= 90) {
      setCheerText("거의 다 왔어요 조금만 더! ");
    } else if (percent === 100) {
      setCheerText("축하해요!! 도장을 눌러보세요~!");
    } else {
      setCheerText("하루의 시작");
    }

    if (isNaN(percent)) {
      percent = 0;
    }
    setPercent(percent);
    return () => {
      setCheerText("");
      setPercent(0);
    };
  }, [REDUX_plan]); // 리덕스의 REDUX_plan 바뀔때마다, (Plan 추가, 삭제, 완료, locked 시에 발생)

  useEffect(() => {
    if (isNaN(percent)) setPercent(0);
    // return () => setPercent(0);
  }, [percent]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchPlan() {
      try {
        const response = await axios.get(BASE_URL + "plan/get", config);
        const FetchedPlanArr = response.data.plans;
        setLoading(false); // 로딩 다 됐으니까
        await props.FetchPlan(FetchedPlanArr); // Redux store에게도 알려줘야 위 useSelector가 변화를 감지해서, useEffect가 실행됨으로써 새로운 REDUX_plan이 랜더링된다.
      } catch (err) {
        console.log("Error like this : ", err);
      }
    }
    async function fetchFollowers() {
      await props.fetchFollower(); // 어잡히 안에서 await 나옴.
    }
    fetchPlan();
    fetchFollowers();
    // return () => setLoading(true);
  }, []);

  useEffect(() => {
    async function fetchFollowers() {
      await props.fetchFollower();
    }

    console.log("서버로부터 팔로워, 플랜정보 새로 가져오기.");
    fetchFollowers();
  }, [refreshing]);
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flexDirection: "column", width: "100%" }}>
          {/* 맨 위의 로고 */}
          <FadeInView duration="1000">
            <View style={styles.logoBar}>
              {/* <Text style={styles.logoText}> Haru </Text> */}
              <Image
                resizeMode="cover"
                style={{ width: 60, height: 60 }}
                source={require("../../../../assets/images/haru.png")}
              />
            </View>
          </FadeInView>

          {/* 전체 화면 (수직)스크롤 뷰 */}
          <ScrollView
            horizontal={false}
            style={{ height: "100%" }}
            refreshControl={
              <RefreshControl
                tintColor="#74B9FF"
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >
            {/*  스토리 (수평)스크롤 뷰  */}
            <StoryLine navigation={props.navigation} />

            {/* 여기서 본문 내용 */}
            <View style={styles.contents}>
              {/* 오늘 Date 컨테이너*/}
              <FadeInView duration="2000">
                <View style={styles.dateContainer}>
                  <Text style={styles.dateText}> 2021.01.10 (일) </Text>
                  <View style={{ position: "relative", flex: 1 }}>
                    <Image
                      resizeMode="stretch"
                      style={{
                        position: "absolute",
                        top: 35,
                        right: -20,
                        width: width - 10,
                        height: 320,
                        opacity: percent === 100 ? 0.1 : 0.3,
                      }}
                      source={require("../../../../assets/images/loadmap3.png")}
                    />
                  </View>
                </View>
              </FadeInView>

              {/* Progress Circle 컨테이너*/}
              <FadeInView duration="3000">
                <View style={styles.progressContainer}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      color: "#888",
                      textAlign: "center",
                      marginBottom: 20,
                      fontFamily: "NotoSans",
                    }}
                  >
                    {REDUX_plan.length === 0
                      ? "아직 오늘의 목표를 정하지 않았어요"
                      : percent === 100
                      ? "도장 쾅쾅!!"
                      : "오늘은 어디까지 왔을까요?"}
                  </Text>
                  <Donut percentage={percent} />
                  <View style={{ position: "absolute", top: 160, zIndex: 100 }}>
                    <Text style={{ color: "#aaa", fontSize: 13 }}>
                      {CheerText}
                    </Text>
                  </View>
                </View>
              </FadeInView>

              <FadeInView duration="3000">
                <View style={styles.planContents}>
                  {isloading ? ( // 아무것도 없으면, plan이 아예 없는 사용자임.
                    <ActivityIndicator
                      size="large"
                      color="#74B9FF"
                      style={{ padding: 30, marginTop: 30 }}
                    />
                  ) : REDUX_plan.length !== 0 ? ( // 로딩 중이 아닌데도, REDUX_plan이 없으면 "플랜을 추가하세요" 보여주기.
                    REDUX_plan.map((
                      plan // 리덕스 스토어에 plan이 있으면 다 보여줌
                    ) => <Planitem key={plan._id} plan={plan} />)
                  ) : (
                    // 밑에 Indicator .
                    <FadeInView duration="4000">
                      <View style={styles.indicator}>
                        <Text style={styles.indicatorText}>
                          하루와 함께, 매일 뿌듯하게.
                        </Text>
                      </View>
                    </FadeInView>
                  )}
                </View>
              </FadeInView>
            </View>
          </ScrollView>
          <TouchableOpacity
            style={{
              position: "absolute",
              padding: 5,
              zIndex: 1,
              bottom: "8%",
              left: "80%",
            }}
            activeOpacity={0.3}
            onPress={() => props.navigation.navigate("SettingPlan")}
          >
            <Image
              style={{
                width: 70,
                height: 70,
                shadowColor: "#aaa",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 1,
                shadowRadius: 3,
              }}
              source={require("../../../../assets/images/floating_button.png")}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
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
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#aaa",
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 120,
    borderWidth: 4,
    borderColor: "#fff",
    marginLeft: 10,
  },
  storyText: {
    fontSize: 11,
    marginLeft: 10,
  },

  dateContainer: {
    justifyContent: "center",
    alignContent: "center",
    width: width * 0.85,
    backgroundColor: "#fff",
    marginVertical: 0,
  },
  ScrollView: {
    height: 87,
    marginBottom: 10,
  },

  contents: {
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 50,
  },
  stamp: {
    flex: 2,
    width: 500,
    height: 500,
  },

  dateText: {
    fontSize: 22,
    marginTop: 30,
    marginBottom: 0,
    marginLeft: 10,
    color: "#aaa",
    fontWeight: "bold",
    alignSelf: "center",
  },
  planContents: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 30,
  },

  progressContainer: {
    width: width * 0.85,
    height: height * 0.32,
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 15,
  },

  progressCircle: {
    width: CIRCLE_WIDTH - 5,
    height: CIRCLE_HEIGHT - 5,
    backgroundColor: "#74B9FF",
    borderRadius: CIRCLE_HEIGHT / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 6.27,
    marginTop: 5,
  },
  progressText: {
    fontSize: 30,
    color: "black",
  },

  addPlanBtn: {
    position: "absolute",
    width: 50,
    height: 50,
    padding: 10,
    left: width * 0.4,
    top: height - 200,
  },
  indicator: {
    padding: 10,
    width: width * 0.85,
    height: height * 0.15,
    backgroundColor: "#fff",
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.54,
    shadowRadius: 6.27,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  indicatorText: {
    fontSize: 20,
    fontWeight: "200",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    FetchPlan: (FetchedPlanArr) => dispatch(actions.FetchPlan(FetchedPlanArr)),
    fetchFollower: () => dispatch(actions.getMate()),
  };
};

export default connect(null, mapDispatchToProps)(HomeScreen);
