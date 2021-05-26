import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, ImageBackground, Platform, StatusBar, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import Layout from '../../constants/Layout';
import ContentCard from '../../components/ContentCard';
import { IContentItem, LinkType } from '../../types';
import { LoadAllItems, AddItem } from '../../storage/ContentStorage';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import AddButton from '../../components/AddButton';


export default function MyMessagesScreen() {

    const [contentItems, setContentItems] = useState<IContentItem[]>([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation();


    useEffect(() => {
        setContentItems([]);
        loadItems();

    }, [isFocused]);

    const loadItems = () => {
        LoadAllItems().then((data: IContentItem[]) => { setContentItems([...data]); });
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/dashboard_background.png')} style={styles.background}>
                <View style={styles.flatlist}><FlatList
                    data={contentItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <ContentCard item={item} onClose={loadItems}></ContentCard>
                        );
                    }}
                /></View>
                <AddButton width={Layout.window.width * 0.65} onPress={() => { navigation.navigate('ContentImport') }}>Add more love!</AddButton>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,

    },
    background: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    flatlist: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'transparent'
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
