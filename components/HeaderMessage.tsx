
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';


const HeaderMessage = (props: any) => {

    return (<View style={styles.header}><Text style={styles.text}>{props.text}</Text></View>)
};

export default HeaderMessage ;

const styles = StyleSheet.create({
    header: {
        margin:10,
        justifyContent:'center',
        alignItems:'center'

    },
    text:{
        color:Colors.light.subtitle,
        fontWeight:'bold',
        fontSize:20
    }
})