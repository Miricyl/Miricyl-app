import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors'
import Layout from '../constants/Layout';


const AddButton = (props: any) => {

    return (
        <View style={styles.messageCard}>
            <TouchableOpacity style={styles.touchableOpacity} onPress={props.onPress}>
                <Text style={styles.cardText}>{props.children}</Text>
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
        backgroundColor: '#ffb115',
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
        color: Colors.light.text,
        fontWeight:'bold'
    },
});


export default AddButton;
