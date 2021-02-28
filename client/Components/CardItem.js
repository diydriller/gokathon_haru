import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions, Image, Text} from 'react-native';
import axios from 'axios';
const { width } = Dimensions.get('window');
const CARD_HEIGHT = 120;
const CARD_WIDTH = width * 0.8;
const BASE_URL = "https://evensunshine.herokuapp.com/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY3MGQ0YWE3MDk3NzAwMTc3MzI2NjIiLCJpYXQiOjE2MTAyMTgyMzJ9.aSFScs4eVIZZ75zMIkO1eL134aJS_OYf4n8GKXDfTqY";

// CardItem => 내 주변에 있는 사람들 
const CardItem = ({ marker, isFollowing, navigation }) => {
    const [Following, setFollowing] = useState(isFollowing); //소켓에서 받아온 isFollowing을 맨 처음에 Hook에 적용.
    
    const followBtnClickHandler = async (userId) => {
        setFollowing(true) // 팔로우 버튼 누른 상태.
        // axios POST
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const data = {
            userId: userId
        }

        const res = await axios.post(BASE_URL + 'mate/follow', data, config)
        if(res.data.success) {
            console.log('팔로우 성공');
        }else {
            setFollowing(false);
            console.log('팔로우 실패.')
            Alert.alert('팔로우 실패했습니다.');
        }
    };

    const UnfollowBtnClickHandler = async (userId) => {
        setFollowing(false);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const data = {
            userId: userId
        }

        const res = await axios.post(BASE_URL + 'mate/unfollow', data, config)
        if(res.data.success) {
            console.log('언팔로우 성공');
        }else {
            setFollowing(true);
            console.log('언팔로우 실패.')
            Alert.alert('언팔로우 실패했습니다.');
        }
    };
    
    // console.log('displayName : ', marker.displayName, 'Following : ', Following);
    return (
        <>
            <Image
                source={{
                        uri: `${marker.profileImage}`
                }}
                style={styles.cardImage}
                resizeMode="contain"
            />
            <View style={styles.textContent}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.cardDisplayName}>{marker.displayName}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-around'}}>

                    {/* 팔로우/언팔로우 버튼 */}
                    {Following ? (
                        <TouchableOpacity
                            style={{...styles.followBtn, backgroundColor: 'tomato'}}
                            onPress={() => UnfollowBtnClickHandler(marker.userId)}
                            
                        >
                            <Text style={{fontWeight: 'bold', fontSize: 11, color: "#fff"}}>
                                v 팔로잉
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.followBtn}
                            onPress={() => {followBtnClickHandler(marker.userId)}}
                        >
                            <Text style={{fontWeight: 'bold', fontSize: 11, color: "#FFF"}}>
                                팔로우
                            </Text>
                        </TouchableOpacity>
                    )}

                    {/* 프로필 보기 버튼 */}
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Follower', {
                                _id: marker.userId,
                                profileImage: marker.profileImage,
                                displayName: marker.displayName,
                                planArray: marker.planArray,
                            })
                        }}
                        style={{...styles.followBtn, backgroundColor: '#fff', borderWidth: 1, borderColor: '#74B9FF'}}
                    >
                        <Text style={{fontWeight: 'bold', fontSize: 11, color: "#74B9FF"}}>
                            프로필 보기
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )   
}

const styles = StyleSheet.create({
    cardImage: {
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 100,
        width: CARD_WIDTH * 0.25,
        height: CARD_HEIGHT * 0.6,
    },
    cardDisplayName: {
        fontSize: 17,
        textAlign: 'center',
        color: '#999',
        fontWeight: "bold",
        paddingHorizontal: 10,
    },
    textContent: {
        flex: 1,
    },
    followBtn: {
        flex: .4,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#74B9FF',
        color: '#fff',
        borderRadius: 20,
    },
})

export default CardItem;