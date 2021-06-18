import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { IContentItem, Schedule, ScheduleMode } from '../types';
import Layout from '../constants/Layout';
import { Feather, AntDesign } from '@expo/vector-icons';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

import CloseButton from './CloseButton';
import { DeleteItem, UpdateItem, UpdateSchedule } from '../services/ContentStorage';
import * as Notifications from 'expo-notifications';
import AddButton from './AddButton';


const ScheduleInfo = (props: { id:string, scheduleItem: Schedule, onClose: any }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [schedule, setSchedule] = useState<Schedule>(props.scheduleItem);
    const [id, setId]= useState<string>(props.id)

    const popUpDelete = () => {
        setModalVisible(true);
    }

    useEffect(() => {
        setSchedule(props.scheduleItem);

    }, []);

    const unscheduleItem = () => {

        if (schedule.identifyer !== undefined) {
            cancelNotification(schedule.identifyer).then(() => {
                let item = { ...schedule };
                if (schedule) {
                    schedule.identifyer = '';
                }
                setSchedule(schedule);
                UpdateSchedule(id,schedule,false).then(() => {
                    setModalVisible(!modalVisible);
                    props.onClose();
                })
            });
        }

        setModalVisible(!modalVisible);

    }

    /// TODO this function should be moved to a notification class to be used across all components
    const cancelNotification = async (id: string) => {
        await Notifications.cancelScheduledNotificationAsync(id);
    }


    let scheduleComponent;
    if (schedule.scheduleMode === ScheduleMode.Interval) {
        scheduleComponent = (<View style={styles.dateInfo}>
            <View style={styles.dateRow}><Feather name="repeat" size={24} color={Colors.borderGrey} /><View style={styles.dateItem}><Text>{'Every ' + schedule.deltaTime + ' ' + schedule.frequency}</Text></View></View>
        </View>)
    }

    if (schedule.scheduleMode === ScheduleMode.Scheduled) {
        scheduleComponent = (<View style={styles.dateInfo}>
            <View style={styles.dateRow}><AntDesign name="calendar" size={24} color={Colors.borderGrey} /><View style={styles.dateItem}><Text>{schedule.day}</Text></View></View>
            <View style={styles.dateRow}><AntDesign name="clockcircleo" size={24} color={Colors.borderGrey} /><View style={styles.dateItem}><Text>{schedule.hour + ':' + (schedule.minute as string).padStart(2, '0')}</Text></View></View>
        </View>)
    }

    return (
        <View style={styles.messageCard}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.rowView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Stop sending this message?</Text>
                            <View>
                                <AddButton
                                    color={Colors.light.subtitle}
                                    onPress={() => {
                                        unscheduleItem();

                                    }}>
                                    <Text style={styles.textStyle}>Unschedule</Text>
                                </AddButton></View>
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
            <View style={styles.content}>
                <View style={styles.textContent}>
                    <View>{scheduleComponent}</View>
                </View>
            </View>
            <CloseButton onPress={popUpDelete} />

        </View>

    );
}

export default ScheduleInfo;

const styles = StyleSheet.create({
    messageCard: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    content: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    textContent: {
        justifyContent: 'space-between',
        width: 'auto',
    },
    dateInfo: {
        flexDirection: 'column',
        margin: 10,
        paddingLeft: 20
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 20,

    },
    dateItem: {
        paddingLeft: 20,

    },

    textItem: {
        color: Colors.light.text,
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold'

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    schedule: {
        marginVertical: 10,
        fontSize: 14,
        color: Colors.light.subtitle,
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
    openButton: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        margin: 10
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    },
});