import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationCard from '../../components/NavigationCard';
import { Text, View } from '../../components/Themed';
import Layout from '../../constants/Layout';
import ContentCard from '../../components/ContentCard';
import { ContentType, IJoyItem } from '../../types';
import { LoadJoyItems, AddJoyItems } from '../../storage/joyItemStorage';

export default function JoyScreen() {

    const [joyItems, setJoyItems] = useState<IJoyItem[]>([]);

    useEffect(() => {
       
        LoadJoyItems().then(data => setJoyItems(data))
        
    }, []);

    let joyitemsView=joyItems.map((item,index)=>{
        return <ContentCard key={item.text} text={item.text} contentType={item.type}></ContentCard>
    })
    
    return (
        <View style={styles.container}>
            <NavigationCard text="Add more joy!" screenName="JoyImport" height={Layout.window.height * 0.05} width={Layout.window.width * 0.8}></NavigationCard>
            <ScrollView>{joyitemsView}</ScrollView>
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
