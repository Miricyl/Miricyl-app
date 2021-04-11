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
        height: Layout.window.height * 0.075,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableOpacity: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10

    },
    cardText: {
        fontSize: 18,
        color: Colors.light.text,
    },
});


export default AddButton;
