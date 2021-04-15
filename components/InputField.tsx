import React from 'react';
import { Image, TextInput, Platform, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { IInputFieldDetails, INavigationCardDetails, LinkType } from '../types';
import Layout from '../constants/Layout';



const InputField = ({ placeholder, lines, onChangeText, value }: IInputFieldDetails) => {
    let multiline = false;
    if (lines > 1) {
        multiline = true;
    }
    return (

        <View style={styles.field}>
            <TextInput placeholderTextColor={Colors.light.text} placeholder={placeholder} multiline={multiline} numberOfLines={lines} onChangeText={onChangeText} value={value} />
        </View>
    );
}

export default InputField;

const styles = StyleSheet.create({
    field: {
        width: Layout.window.width * 0.75,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }

});
