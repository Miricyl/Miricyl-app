import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors'
import Layout from '../constants/Layout';


const SelectButton = (props: {icon:any, onPress:any, selected:boolean}) => {
    let color=Colors.brown;
    let backgroundcolor='white';
 if (props.selected){
     color='white';
     backgroundcolor = Colors.brown;

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
        width: Layout.window.width * 0.65,
        height: 40,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin:20
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
