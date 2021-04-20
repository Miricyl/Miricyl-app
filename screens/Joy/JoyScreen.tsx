import React, { useState, useEffect } from 'react';
import { FlatList, ImageBackground, StatusBar, StyleSheet } from 'react-native';
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

        LoadJoyItems().then((data: IContentItem[]) => setJoyItems(data))

    }, [isFocused]);

    return (
        <View style={styles.container}>
        <ImageBackground source={require('../../assets/images/dashboard_background.png')} style={styles.background}>
            <AddButton width={Layout.window.width * 0.65} onPress={()=>{navigation.navigate('JoyImport')}}>Add more love!</AddButton>
            <View style={styles.flatlist}><FlatList
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={joyItems}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <ContentCard {...item}></ContentCard>
                    );
                }}
            /></View>
            <NavigationCard text="Manage Wellness messages" link="ManageWellnessMessadge" linkType={LinkType.Screen}></NavigationCard>
        </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        
    },
    background: {
        justifyContent: 'center',
        alignItems: 'center',
        height: Layout.window.height,
        width: Layout.window.width,
    },
    flatlist:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 40,
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
