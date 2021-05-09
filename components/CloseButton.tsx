
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { EvilIcons } from '@expo/vector-icons';


const CloseButton = (props: any) => {

    return (<View style={styles.delete}><TouchableOpacity onPress={props.onPress}><EvilIcons name="close" size={24} color="black" /></TouchableOpacity></View>)
};

export default CloseButton;

const styles = StyleSheet.create({
    delete: {
        backgroundColor: Colors.grey,
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderRadius: 5,
        width: 29,
        height: 29

    }
})