import React, {useState} from 'react';
import {View, StyleSheet, TouchableHighlight, Dimensions} from 'react-native';
import {connect} from 'react-redux';

import * as actionTypes from '../Container/Redux/actions/actionTypes';

const { width, height } = Dimensions.get('window');

const BackDrop = (props) => {
    console.log('props show : ', props.modalVisible);
    return (
        props.modalVisible ? <View style={styles.BackDrop}/>  : null
    )   
}

const styles = StyleSheet.create({
    BackDrop: {
        zIndex: 200,
        position: 'absolute',
        width,
        height,
        backgroundColor: '#000',
        opacity: 0.5,
    }
})

const mapStateToProps = (store) => {
    return {
        modalVisible: store.UIReducer.modalVisible, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        BackdropClicked: () => dispatch({type: actionTypes.BACKDROP_CLICKED})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackDrop);