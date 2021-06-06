import * as React from 'react';
import { Platform, StyleSheet, ScrollView } from 'react-native';
import Colors from '../constants/Colors'
import { View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { IContentItem, Weekday, ScheduleMode, Intervals, Schedule } from '../types';
import { LoadItem, UpdateItem } from '../services/ContentStorage';
import AddButton from '../components/AddButton'
import Layout from '../constants/Layout';
import { ContentProps } from '../types';
import { RadioButton, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import ScheduleInfo from '../components/ScheduleInfo';
import { ScheduleIntervalNotification, ScheduleScheduledNotification } from '../services/PushNotifications';
import { useNavigation } from '@react-navigation/native';


const ScheduleMessageScreen = ({ navigation, route }: ContentProps) => {
    const nav = useNavigation();
    const { contentId } = route.params;
    const [contentItem, setContentItem] = useState<IContentItem>();
    const [hour, setHour] = useState('00');
    const [minute, setMinute] = useState('00')
    const [day, setDay] = useState("Monday");
    const [scheduleMode, setScheduleMode] = useState(ScheduleMode.Scheduled);
    const [firstDigit, setFirstDigit] = useState('0');
    const [secondDigit, setSecondDigit] = useState('0');
    const [interval, setInterval] = useState('Days');

    useEffect(() => {
        LoadContentItem();
    }, []);

    const LoadContentItem = () => {
        LoadItem(contentId).then((data) => {
            if (data) {
                setContentItem(data as IContentItem);
                setHour(data.schedule.hour);
                setMinute(data.schedule.minute);

                setDay(data.schedule.day);
                setScheduleMode(data.schedule.scheduleMode);
                setInterval(data.schedule.frequency);
                let time;
                if (data.schedule.deltaTime) {
                    if (data.schedule.deltaTime > 9) {
                        time = data.schedule.deltaTime.toString().split('');
                        setFirstDigit(time[0]);
                        setSecondDigit(time[1]);
                    }
                    if (data.schedule.deltaTime < 9) {
                        setFirstDigit('0');
                        setSecondDigit(data.schedule.deltaTime.toString());
                    }
                }
            }
        });
    }

    const weekdays = Object.values(Weekday);
    const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
    const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
    const upToTen = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const intervals = Object.values(Intervals);

    const goToPlanScreen = () => {
        nav.navigate('FeatureNotAvailable');
    }

    const updateSchdeduleInfo = (notificationId: string, schedule: Schedule) => {
        if (contentItem) {
            var item: IContentItem = { ...contentItem };
            item.active = true;
            item.schedule = schedule;
            item.schedule.identifyer = notificationId;
            UpdateItem(item);
            setContentItem(item);
        }

    }

    const scheduleMessage = async () => {
        if (contentItem != undefined) {

            let notificationId: any;
            if (scheduleMode === ScheduleMode.Scheduled) {

                let schedule: Schedule = {
                    day: day as Weekday,
                    hour: hour,
                    minute: minute,
                    scheduleMode: ScheduleMode.Scheduled,
                    identifyer: contentItem.schedule.identifyer,
                    frequency: interval as Intervals,
                    deltaTime: 0

                }

                notificationId = await ScheduleScheduledNotification(contentItem, schedule);

                if (notificationId) {
                    updateSchdeduleInfo(notificationId, schedule);

                }
            }

            if (scheduleMode === ScheduleMode.Interval) {
                const timeUnits = Number('' + firstDigit + secondDigit);
                let schedule: Schedule = {
                    day: day as Weekday,
                    hour: hour,
                    minute: minute,
                    scheduleMode: ScheduleMode.Interval,
                    identifyer: contentItem.schedule.identifyer,
                    frequency: interval as Intervals,
                    deltaTime: timeUnits

                }
                notificationId = await ScheduleIntervalNotification(contentItem, schedule);
                if (notificationId) {
                    updateSchdeduleInfo(notificationId, schedule);

                }
            }
        }

    }

    let dateContainer;
    let picker;
    let dayWidth = Platform.OS == "android" ? 180 : 150;

    if (contentItem !== undefined && contentItem.active) {
        dateContainer = <ScheduleInfo item={contentItem} onClose={LoadContentItem} />
    }
    if (contentItem !== undefined) {

        if (scheduleMode === ScheduleMode.Scheduled) {
            picker = (<View style={styles.pickers}>
                <Picker selectedValue={day} style={{ ...styles.picker, width: dayWidth }} onValueChange={(itemValue: any, itemIndex: Number) =>
                    setDay(itemValue)}>
                    {weekdays.map((item: any, index: Number) => { return (<Picker.Item label={item} value={item} key={index.toString()} />) })}
                </Picker>
                <View style={styles.digits}>
                    <Picker selectedValue={hour} style={{ ...styles.picker, width: 90 }} onValueChange={(itemValue: any, itemIndex) =>
                        setHour(itemValue)}>
                        {hours.map((item: any, index: Number) => { return (<Picker.Item label={item} value={item} key={index.toString()} />) })}
                    </Picker>
                    <Picker selectedValue={minute} style={{ ...styles.picker, width: 90 }} onValueChange={(itemValue: any, itemIndex) =>
                        setMinute(itemValue)}>
                        {minutes.map((item: any, index: Number) => { return (<Picker.Item label={item} value={item} key={index.toString()} />) })}
                    </Picker>
                </View>
            </View>);
        }
        if (scheduleMode === ScheduleMode.Interval) {
            picker = (<View style={styles.pickers}>
                <View style={styles.digits}>
                    {/* TODO for android make a Picker from 0 to 60 */}
                    <Picker selectedValue={firstDigit} style={{ ...styles.picker, width: 80, paddingRight: 0, marginRight: -10 }} onValueChange={(itemValue: any, itemIndex: Number) =>
                        setFirstDigit(itemValue)}>
                        {upToTen.map((item: any, index: Number) => { return (<Picker.Item label={item} value={item} key={index.toString()} />) })}
                    </Picker>
                    <Picker selectedValue={secondDigit} style={{ ...styles.picker, width: 80 }} onValueChange={(itemValue: any, itemIndex) =>
                        setSecondDigit(itemValue)}>
                        {upToTen.map((item: any, index: Number) => { return (<Picker.Item label={item} value={item} key={index.toString()} />) })}
                    </Picker>
                </View>
                <Picker selectedValue={interval} style={{ ...styles.picker, width: 150 }} onValueChange={(itemValue: any, itemIndex) =>
                    setInterval(itemValue)}>
                    {intervals.map((item: any, index: Number) => { return (<Picker.Item label={item} value={item} key={index.toString()} />) })}
                </Picker>
            </View>);
        }
    }

    return (<ScrollView contentContainerStyle={styles.screen}>
        <View style={styles.dateContainer}>
            {dateContainer}
            <AddButton width={'90%'} borderWidth={1} borderColor={Colors.borderGrey} onPress={goToPlanScreen}>Add to Plan</AddButton>
        </View>
        <View style={styles.container}>
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
            <AddButton width={'90%'} color={Colors.light.tint} onPress={scheduleMessage}>Schedule</AddButton>
        </View>
    </ScrollView>
    );
}


export default ScheduleMessageScreen;

const styles = StyleSheet.create({
    screen: {
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
        height: 400,
        width: Layout.window.width * 0.9,
        margin: 10,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dateContainer: {
        justifyContent: 'space-evenly',
        marginTop: 60,
        marginBottom: 10,
        padding: 20,
        width: '90%',
        borderRadius: 5,
    },
    pickers: {

        ...Platform.select({
            ios: {
                flexDirection: 'row',
                padding: 4,
                marginTop: -160

            },
            android: {
                flexDirection: 'column',
                padding: 6,

            },
        }),
    },
    digits: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    picker: {
        padding: 10,
        height: 60,
        width: 50
    }

});


