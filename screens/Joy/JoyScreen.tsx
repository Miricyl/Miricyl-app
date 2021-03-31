import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationCard from '../../components/NavigationCard';
import { Text, View } from '../../components/Themed';
import Layout from '../../constants/Layout';
import ContentCard from '../../components/ContentCard';
import { IContentItem, LinkType } from '../../types';
import { LoadJoyItems, AddJoyItem } from '../../storage/ContentStorage';
import { useIsFocused } from '@react-navigation/native';

export default function JoyScreen() {

    const [joyItems, setJoyItems] = useState<IContentItem[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
       
        LoadJoyItems().then((data:IContentItem[]) => setJoyItems(data))
        
    }, [isFocused]);

    let joyitemsView=joyItems.map((item,index)=>{
       
        return <View key={item.id}><ContentCard {...item}></ContentCard></View>
    })

    console.log(joyitemsView);
    
    return (
        <View style={styles.container}>
            <NavigationCard text="Add more joy!" link="JoyImport" linkType={LinkType.Screen}></NavigationCard>
            <ScrollView contentContainerStyle={{width:'100%', alignItems:'center'}}>{joyitemsView}</ScrollView>
            <NavigationCard text="Manage Wellness messages" link="ManageWellnessMessadge" linkType={LinkType.Screen}></NavigationCard>
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
