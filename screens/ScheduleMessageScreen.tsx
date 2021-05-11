import * as React from 'react';
import { Platform, StyleSheet, Image, TextInput, ImageBackground, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Linking, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors'
import { Text, View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { CategoryType, ContentSelect, ContentType, IContentItem, Frequency, CategoryProps, SchedulingDetails } from '../types';
import { LoadItem } from '../storage/ContentStorage';
import AddButton from '../components/AddButton'
import { useNavigation } from '@react-navigation/native';
import Layout from '../constants/Layout';
import InputField from '../components/InputField';
import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import { ContentProps } from '../types';
import { Notifications } from 'expo';


const ScheduleMessageScreen = ({ navigation, route }: ContentProps) => {

  const { contentId } = route.params;
  const [contentItem, setContentItem] = useState<IContentItem>({ category: CategoryType.Love, id: 'unknown', active:false, contentType: ContentType.Text });
  const [time, setTime] = useState(new Date());
  const [day, setDay] = useState(2);

  useEffect(() => {

    LoadItem(contentId).then((data) => setContentItem(data as IContentItem))

  }, []);


  const onTimeChange = (event: any, selectedDate: any) => {
    setTime(selectedDate);
  }

  const goToPlanScreen = ()=>{

  }

  const scheduleMessage = () => {
//TODO if notificationId isn't null the old notification needs to be unscheduled first.
    let notificationId = Notifications.scheduleNotificationAsync({
      content: {
        title: "A reminder",
        body: contentItem.title,
        data: { id: contentItem.id },
      },
      //this is the weekly repeating one. Use later when id is saved so it can be cancelled
      //trigger: { repeats: true, weekday:day, hour: time.getHours(), minute: time.getMinutes() },
      trigger: { repeats: false, day: time.getDay(), hour:time.getHours(), minute:time.getMinutes() },
    });

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


  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === "ios" ? "padding" : "height"}
    ><TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <AddButton width={'90%'} borderWidth={1} borderColor={Colors.borderGrey} onPress={goToPlanScreen}>Add to Plan</AddButton>
                    <View style={styles.dateContainer}>
                        <Text>Starts</Text>
                        <View><Text>icon</Text><Text>icon</Text></View>
                        <View><Text>Monday</Text><Text>11.00</Text></View>
                    </View>
                    <AddButton width={'90%'} color={Colors.light.tint} onPress={scheduleMessage}>Save</AddButton>
                </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}


export default ScheduleMessageScreen;

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        backgroundColor: Colors.grey,
        paddingTop: 20

    },

    container: {
        height: 550,
        width: Layout.window.width * 0.9,
        margin: 10,
        marginTop: 30,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%'
    }

});


