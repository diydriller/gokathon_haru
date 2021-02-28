import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Dimensions,
  Image,
} from "react-native";
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');
const MODAL_WIDTH = width * 0.8;
const MODAL_HEIGHT = height * 0.6;


const Modals = (props) => {
    const {bgColor, textColor, text, userData, width } = props;
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.centeredView}>
        <Modal
            animationType='slide'
            transparent
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View style={{fle: 1, flexDirection: 'row', alignItems: 'center',}}>
                  <Image style={styles.profileImage} source={require('../assets/images/im1.jpg')} />
                  <Text style={styles.modalText}> 정이든님의 하루 </Text>
                </View>
                <View style={{flex: 1}}>
              
                </View>
                <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#ff605c", padding: 15}}
                onPress={() => {
                    console.log('clicked')
                    setModalVisible(!modalVisible);
                    props.modalVisible();;
                }}
                >
                <Text style={{...styles.textStyle, fontSize: 12}}>닫기</Text>
                </TouchableHighlight>
              </View>
          </View>
        </Modal>

        <TouchableHighlight
            style={{...styles.openButton, backgroundColor: `${bgColor}`}}
            onPress={() => {
                setModalVisible(true);
                props.modalVisible();
            }}
        >
            <Text style={{...styles.textStyle, color: `${textColor}`}}>{text}</Text>
        </TouchableHighlight>
        </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    position: "relative",
    top: '35%',
    zIndex: 500,
    width: MODAL_WIDTH,
    height:  MODAL_HEIGHT,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5 //only for android
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  openButton: {
    backgroundColor: "#74B9FF",
    borderWidth: 1,
    borderColor: '#74B9FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: '#fff',
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "center"
  },
  modalText: {
    textAlign: "center",
    fontWeight: 'bold',
  }
});

const mapDispatchToProps = dispatch => {
    return {
        modalVisible: () => dispatch({type: 'MODAL_VISIBLE'}),
    }
}

export default connect(null, mapDispatchToProps)(Modals);