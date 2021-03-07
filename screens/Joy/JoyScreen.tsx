import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationCard from '../../components/NavigationCard';

import { Text, View } from '../../components/Themed';
import Layout from '../../constants/Layout';
import ContentCard from '../../components/ContentCard';
import { ContentType } from '../../types'


export default function JoyScreen() {
    return (
        <View style={styles.container}>
            <NavigationCard text="Add more joy!" screenName="JoyImport" height={Layout.window.height * 0.05} width={Layout.window.width * 0.8}></NavigationCard>
            <ScrollView><ContentCard text="first card" contentType={ContentType.Text} ></ContentCard></ScrollView>

            <NavigationCard text="Manage Wellness messages" screenName="ManageWellnessMessadge" height={Layout.window.height * 0.05} width={Layout.window.width * 0.8}></NavigationCard>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
