import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors'
import Layout from '../constants/Layout';


const SelectButton = (props: {icon:any, onPress:any, selected:boolean}) => {
    let color=Colors.brown;
    let backgroundcolor='white';
 if (props.selected){
     color='white';
     backgroundcolor = Colors.light.primary;

 }
    return (
        <View style={{...styles.messageCard, backgroundColor:backgroundcolor}}>
            <TouchableOpacity style={styles.touchableOpacity} onPress={props.onPress}>
            {props.icon} 
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    messageCard: {
        width: 60,
        height: 60,
        shadowColor: 'black',
        shadowOpacity: 0.10,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        elevation: 3,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin:10
    },
    touchableOpacity: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5

    },
    cardText: {
        fontSize: 18,
        fontWeight:'bold'
    },
});


export default SelectButton;
