import * as React from 'react';
import { Platform, StyleSheet, Image, TextInput, ImageBackground, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Linking, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../constants/Colors'
import { View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { CategoryType, ContentSelect, ContentType, IContentItem, CategoryProps, SchedulingDetails, Weekday, ScheduleMode, Intervals } from '../types';
import { LoadItem } from '../storage/ContentStorage';
import AddButton from '../components/AddButton'
import { useNavigation } from '@react-navigation/native';
import Layout from '../constants/Layout';
import InputField from '../components/InputField';
import { AntDesign, Feather } from '@expo/vector-icons';
import { ContentProps } from '../types';
import * as Notifications from 'expo-notifications';
import { RadioButton, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';


const ScheduleMessageScreen = ({ navigation, route }: ContentProps) => {

    const { contentId } = route.params;
    const [contentItem, setContentItem] = useState<IContentItem>();
    const [hour, setHour] = useState('00');
    const [minute, setMinute] = useState('00')
    const [day, setDay] = useState("Monday");
    const [scheduleMode, setScheduleMode] = useState(ScheduleMode.Interval);
    const [firstDigit, setFirstDigit] = useState('0');
    const [secondDigit, setSecondDigit] = useState('0');
    const [interval, setInterval] = useState('Day');

    useEffect(() => {

        LoadItem(contentId).then((data) => setContentItem(data as IContentItem));
        //TODO set properties based on existing scheduling details


    }, []);

    const goToPlanScreen = () => {

    }

    const scheduleMessage = async () => {
        //if notificationId isn't null the old notification needs to be unscheduled first.
        if (contentItem?.schedulingDetails.identifyer !== undefined) {
            const result = await Notifications.cancelScheduledNotificationAsync(contentItem.schedulingDetails.identifyer);
            console.log(result);
            //TODO set to blank if successful
        }

        let notificationId;
        if (scheduleMode === ScheduleMode.Scheduled) {
            notificationId = Notifications.scheduleNotificationAsync({
                content: {
                    title: "A reminder",
                    body: contentItem?.title,
                    data: { id: contentItem?.id },
                },
                //this is the weekly repeating one. Use later when id is saved so it can be cancelled
                //trigger: { repeats: true, weekday:day, hour: time.getHours(), minute: time.getMinutes() },
                //TODO fix weekday from name to number
                trigger: { repeats: false, weekday: 1, hour: Number(hour), minute: Number(minute) },
            });
        }
        if (scheduleMode === ScheduleMode.Interval) {
            const multiplier = 10;//TODO calculate seconds for each interval type
            const seconds = Number(firstDigit as unknown as string + secondDigit as string) * multiplier;
            notificationId = Notifications.scheduleNotificationAsync({
                content: {
                    title: "A reminder",
                    body: contentItem?.title,
                    data: { id: contentItem?.id },
                },
                //this is the weekly repeating one. Use later when id is saved so it can be cancelled
                //trigger: { repeats: true, weekday:day, hour: time.getHours(), minute: time.getMinutes() },
                trigger: {
                    seconds: seconds,//TODO calculate the number of seconds between messages based on settings
                    repeats: false
                }, //change to true for deployment
            });

        }

        //TODO save notificationId as part of contentItem

    }

    const weekdays = Object.values(Weekday);
    const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
    const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
    const upToTen = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const intervals = Object.values(Intervals);

    let dateContainer;

    let picker;

    let pickerInterval = (<View style={styles.pickers}>
        <Picker selectedValue={firstDigit} style={styles.picker} onValueChange={(itemValue: string, itemIndex: Number) =>
            setFirstDigit(itemValue)}>
            {upToTen.map((item: any, index: Number) => { return (<Picker.Item label={item} value={item} key={index.toString()} />) })}
        </Picker>
        <Picker selectedValue={secondDigit} style={styles.picker} onValueChange={(itemValue: string, itemIndex) =>
            setSecondDigit(itemValue)}>
            {upToTen.map((item: any, index: Number) => { return (<Picker.Item label={item} value={item} key={index.toString()} />) })}
        </Picker>
        <Picker selectedValue={interval} style={{ ...styles.picker, width: 100 }} onValueChange={(itemValue: string, itemIndex) =>
            setInterval(itemValue)}>
            {intervals.map((item: any, index: Number) => { return (<Picker.Item label={item} value={item} key={index.toString()} />) })}
        </Picker>
    </View>)

    let pickerSchedule = (<View style={styles.pickers}>
        <Picker selectedValue={day} style={{ ...styles.picker, width: 100 }} onValueChange={(itemValue: string, itemIndex: Number) =>
            setDay(itemValue)}>
            {weekdays.map((item: any, index: Number) => { return (<Picker.Item label={item} value={item} key={index.toString()} />) })}
        </Picker>
        <Picker selectedValue={hour} style={styles.picker} onValueChange={(itemValue: string, itemIndex) =>
            setHour(itemValue)}>
            {hours.map((item: any, index: Number) => { return (<Picker.Item label={item} value={item} key={index.toString()} />) })}
        </Picker>
        <Picker selectedValue={minute} style={{ ...styles.picker, width: 60 }} onValueChange={(itemValue: string, itemIndex) =>
            setMinute(itemValue)}>
            {minutes.map((item: any, index: Number) => { return (<Picker.Item label={item} value={item} key={index.toString()} />) })}
        </Picker>
    </View>)

    if (scheduleMode === ScheduleMode.Scheduled) {

        dateContainer = (<View style={styles.dateInfo}>
            <View style={styles.dateRow}><AntDesign name="calendar" size={24} color={Colors.borderGrey} /><View style={styles.dateItem}><Text>{day}</Text></View></View>
            <View style={styles.dateRow}><AntDesign name="clockcircleo" size={24} color={Colors.borderGrey} /><View style={styles.dateItem}><Text>{hour as string + ':' + minute as string}</Text></View></View>
        </View>)

        picker = pickerSchedule;
    }
    if (scheduleMode === ScheduleMode.Interval) {
        dateContainer = (<View style={styles.dateInfo}>
            <View style={styles.dateRow}><Feather name="repeat" size={24} color={Colors.borderGrey} /><View style={styles.dateItem}><Text>Every {firstDigit as unknown as string + secondDigit as string} {interval}</Text></View></View>
        </View>)
        picker = pickerInterval;
    }



    return (<ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.container}>
            <AddButton width={'90%'} borderWidth={1} borderColor={Colors.borderGrey} onPress={goToPlanScreen}>Add to Plan</AddButton>
            <View style={styles.dateContainer}>
                {dateContainer}
            </View>
            <View >
                <RadioButton.Group onValueChange={(value: string) => setScheduleMode(value as ScheduleMode)}
                    value={scheduleMode}>
                    <View style={styles.radioButton}>
                        <RadioButton value={ScheduleMode.Scheduled} />
                        <Text>Scheduled</Text>
                    </View>
                    <View style={styles.radioButton}>
                        <RadioButton value={ScheduleMode.Interval} />
                        <Text>Interval</Text>
                    </View>
                </RadioButton.Group>
            </View>
            {picker}

            <AddButton width={'90%'} color={Colors.light.tint} onPress={scheduleMessage}>Save</AddButton>
        </View>
    </ScrollView>
    );
}


export default ScheduleMessageScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.grey,

    },
    radioButton: {
        width: 200,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        width: Layout.window.width * 0.9,
        margin: 10,
        marginTop: 30,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 100
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
    pickers: {
        flexDirection: 'row',
        paddingBottom: 200
    },
    picker: {
        padding: 10,
        height: 60,
        width: 50
    }

});


