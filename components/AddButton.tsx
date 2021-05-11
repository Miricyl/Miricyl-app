import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors'
import Layout from '../constants/Layout';


const AddButton = (props: any) => {

    return (
        <View style={{...styles.messageCard, width: props.width, backgroundColor: props.color, borderWidth: props.borderWidth, borderColor:props.borderColor}}>
            <TouchableOpacity style={styles.touchableOpacity} onPress={props.onPress}>
                <Text style={styles.cardText}>{props.children}</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    messageCard: {
        height: 40,
        borderRadius: 7,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal:3,
        marginVertical:10
    },
    touchableOpacity: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5

    },
    cardText: {
        fontSize: 16,
        color: Colors.light.text,
        fontWeight:'bold'
    },
});


export default AddButton;
