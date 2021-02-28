import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export const UnKnownFriend = (props) => { //내가 팔로잉 하고있는 친구들
    return (
        <>
            <TouchableOpacity
                style={styles.story}
                activeOpacity={0.8}
                onPress={() => {
                    props.navigation.navigate('Follower', {
                        _id: 1,
                        profileImage: '',
                        displayName: '정이든',
                    })
                }}
            >
                <Image
                    source={require('../assets/images/no_person_profile.png')}
                    style={styles.storyImage}
                />
                <Text style={styles.storyText}></Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.story}
                activeOpacity={0.8}
                onPress={() => {
                    props.navigation.navigate('Follower', {
                        _id: 1,
                        profileImage: '',
                        displayName: '정이든',
                    })
                }}
            >
                <Image
                    source={require('../assets/images/no_person_profile.png')}
                    style={styles.storyImage}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.story}
                activeOpacity={0.8}
                onPress={() => {
                    props.navigation.navigate('Follower', {
                        _id: 1,
                        profileImage: '',
                        displayName: '정이든',
                    })
                }}
            >
                <Image
                    source={require('../assets/images/no_person_profile.png')}
                    style={styles.storyImage}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.story}
                activeOpacity={0.8}
                onPress={() => {
                    props.navigation.navigate('Follower', {
                        _id: 1,
                        profileImage: '',
                        displayName: '정이든',
                    })
                }}
            >
                <Image
                    source={require('../assets/images/no_person_profile.png')}
                    style={styles.storyImage}
                />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    story: {
        flex: 1,
        marginTop: 5,
        alignItems: "center",
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
})