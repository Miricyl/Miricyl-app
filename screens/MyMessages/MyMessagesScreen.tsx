import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, ImageBackground, Platform, StatusBar, StyleSheet, Modal } from 'react-native';
import { Text, View } from '../../components/Themed';
import Layout from '../../constants/Layout';
import ContentCard from '../../components/ContentCard';
import { IContentItem, LinkType } from '../../types';
import { LoadAllItems, AddItem, RemoveAllSchedules } from '../../services/ContentStorage';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import AddButton from '../../components/AddButton';
import Colors from '../../constants/Colors';
import ConfirmModal from '../../components/ConfirmModal';
import CloseButton from '../../components/CloseButton';
import { UnscheduleAllMessages } from '../../services/PushNotifications';


export default function MyMessagesScreen() {

    const [contentItems, setContentItems] = useState<IContentItem[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();
    const navigation = useNavigation();


    useEffect(() => {
        setContentItems([]);
        loadItems();

    }, [isFocused]);

    const loadItems = () => {
        LoadAllItems().then((data: IContentItem[]) => { setContentItems([...data]); });
    }

    const unscheduleAllMessages = async () => {
        await UnscheduleAllMessages();
        await RemoveAllSchedules();
        await loadItems();     
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.flatlist}><FlatList
                data={contentItems}
                keyExtractor={(item) => item.id}
                renderItem={({item }) => {
                    return (
                        <ContentCard item={{...item}} onClose={loadItems}></ContentCard>
                    );
                }}
            /></View>
            <AddButton onPress={() => { setModalVisible(true) }} width={Layout.window.width * 0.5} >Unschedule all messages</AddButton>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.rowView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Are you sure you want to unschedule all messages?</Text>
                            <AddButton color={Colors.light.subtitle}
                                onPress={() => {
                                    unscheduleAllMessages();
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={styles.textStyle}>Yes</Text>
                            </AddButton>
                            <AddButton
                                color={Colors.grey}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text style={{ ...styles.textStyle, color: 'black' }}>Cancel</Text>
                            </AddButton>
                        </View>
                        <CloseButton onPress={() => {
                            setModalVisible(!modalVisible);
                        }} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: Colors.grey
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
    }, textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    centeredView: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 155,

    },
    modalView: {
        margin: 20,
        padding: 15,
        alignItems: 'center',

    },
    rowView: {
        flexDirection: 'row',
        borderRadius: 8,
        padding: 10
    },

});
