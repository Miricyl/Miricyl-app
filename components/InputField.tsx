import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { View } from './Themed';
import { IInputFieldDetails } from '../types';


const InputField = ({ placeholder, height, width, lines, onChangeText, value }: IInputFieldDetails) => {
    let multiline = false;
    if (lines > 1) {
        multiline = true;
    }
    return (

        <View style={{ ...styles.field, height: height, width: width }}>
            <TextInput style={styles.textInput} placeholderTextColor={Colors.borderGrey} placeholder={placeholder} multiline={multiline} numberOfLines={lines} onChangeText={onChangeText} value={value} />
        </View>
    );
}

export default InputField;

const styles = StyleSheet.create({
    field: {
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.borderGrey,
        marginVertical:10

    },
    textInput: {
        textAlignVertical: 'top',
        padding:5

    }

});
