import * as React from 'react';
import { Platform, StyleSheet, Image, TextInput, ImageBackground, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../constants/Colors'
import { Text, View } from '../components/Themed';
import { useState } from 'react';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CategoryType, ContentSelect, ContentType, IContentItem, Frequency, CategoryProps, SchedulingDetails } from '../types';
import AddButton from '../components/AddButton'
import Layout from '../constants/Layout';

const Scheduler = (contentItem: IContentItem) => {

    const [showScheduling, setShowScheduling] = useState<boolean>(false);
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const [time, setTime] = useState(new Date());
    const [day, setDay] = useState(2);
    const [frequency, setFrequency] = useState(Frequency.Daily);


    const updateSchedule = (schedule: SchedulingDetails) => {


    }

    async function scheduleMessage() {
        setShowScheduling(false);
        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title: "A reminder",
                body: contentItem.title,
                data: { id: contentItem.id },
            },
            //this is the weekly repeating one. Use later when id is saved so it can be cancelled
            //trigger: { repeats: true, weekday:day, hour: time.getHours(), minute: time.getMinutes() },
            trigger: { repeats: false, day: time.getDay(), hour: time.getHours(), minute: time.getMinutes() },
        });


        let schedulingDetails: SchedulingDetails = {
            identifyer: identifier,
            day: day, //1 corresponds to Sunday
            hour: 18,
            minute: 23,
            frequency: frequency
        }

        updateSchedule(schedulingDetails);

    }


    const daysInWeek: any[] = [
        { label: "Monday", value: 2 },
        { label: "Tuesday", value: 3 },
        { label: "Wednesday", value: 4 },
        { label: "Thursday", value: 5 },
        { label: "Friday", value: 6 },
        { label: "Saturday", value: 7 },
        { label: "Sunday", value: 1 }
    ]

    let scheduling = null;
    let timePicker = null;

    const openTimePicker = () => {
        setShowTimePicker(true);
    }

    const onTimeChange = (event: any, selectedDate: any) => {
        setTime(selectedDate);
        setShowTimePicker(false);
    }

    if (showTimePicker) {
        timePicker = <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode='time'
            is24Hour={true}
            display="default"
            onChange={onTimeChange}
        />
    }
    else {
        timePicker = <AddButton onPress={openTimePicker}>Set Time</AddButton>;
    }

    if (showScheduling) {

        scheduling = <AddButton onPress={scheduleMessage}>Schedule message</AddButton>

    }
    else {
        scheduling = <AddButton onPress={setShowScheduling(false)}>Cancel</AddButton>

    }

    return { scheduling }

}

export default Scheduler;

const styles = StyleSheet.create({
    image: {
        width: Layout.window.width * 0.45,
        height: 350,


    }
});