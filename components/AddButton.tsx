import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors'


const AddButton = (props:any) => {

    return (
        <TouchableOpacity onPress={props.onPress} style={props.style}>
            <View style={{...styles.button, ...props.color}}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 10

    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign:'center'

    }
});


export default AddButton;
