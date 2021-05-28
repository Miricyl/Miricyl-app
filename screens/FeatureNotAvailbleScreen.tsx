import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

import { Ionicons } from '@expo/vector-icons'; 


const FeatureNotAvailableScreen = () => {
    return (
        <View style={styles.featureView}>
            <Ionicons style={styles.iconFeature} name="construct" size={50} />
            <Text style={styles.featureText}>This funcionality is not yet available. 
            This feature will be ready in future versions of the Miricyl App</Text>
            <Ionicons style={styles.iconFeature} name="construct" size={50} />
        </View>
    );
}

export default FeatureNotAvailableScreen;

const styles = StyleSheet.create({
    featureView: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 50,
        backgroundColor: Colors.light.background,
    },

    featureText: {
        fontSize: 27,
        lineHeight: 60,
        color: Colors.light.text
    },
    iconFeature: {
        color: Colors.light.text,
    }

})