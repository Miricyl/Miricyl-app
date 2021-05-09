import React, { useState, useEffect } from 'react';
import { FlatList, ImageBackground, Platform, StatusBar, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationCard from '../../components/NavigationCard';
import { Text, View } from '../../components/Themed';
import Layout from '../../constants/Layout';
import ContentCard from '../../components/ContentCard';
import { IContentItem, LinkType } from '../../types';
import { LoadJoyItems, AddJoyItem } from '../../storage/ContentStorage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AddButton from '../../components/AddButton';


export default function JoyScreen() {

    const [joyItems, setJoyItems] = useState<IContentItem[]>([]);
    const isFocused = useIsFocused();
    const navigation= useNavigation();


    useEffect(() => {

        loadItems();

    }, [isFocused]);

    const loadItems=()=>{
         LoadJoyItems().then((data: IContentItem[]) => setJoyItems(data))
    }
    return (
        <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/dashboard_background.png')} style={styles.background}>
            <View style={styles.flatlist}><FlatList
                data={joyItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <ContentCard item={item} onClose={loadItems}></ContentCard>
                    );
                }}
            /></View>
            <AddButton width={Layout.window.width * 0.65} onPress={()=>{navigation.navigate('ContentImport')}}>Add more love!</AddButton>
        </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS==='ios'?StatusBar.currentHeight:0,
        
    },
    background: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    flatlist:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 10,
        backgroundColor:'transparent'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    items: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
   
});
