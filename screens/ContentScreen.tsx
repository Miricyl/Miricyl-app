import * as React from 'react';
import { Linking, Platform, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import { CategoryType, ContentType, IContentItem, ContentProps } from '../types';
import { useEffect, useState } from 'react';
import { LoadItem } from '../storage/ContentStorage';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import sms from 'react-native-sms-linking';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectWidget from '../components/SelectWidget';
import AddButton from '../components/AddButton';
import { ScrollView } from 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications'


const ContentScreen = ({ navigation, route }: ContentProps) => {
  //content screen should allow you to schedule message and delete item.
  const { contentId } = route.params;
  const [contentItem, setContentItem] = useState<IContentItem>({ category: CategoryType.Love, id: 'unknown', active:false, contentType: ContentType.Text });
  const [showScheduling, setShowScheduling] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [time, setTime] = useState(new Date());
  const [day, setDay] = useState(2);

  useEffect(() => {

    LoadItem(contentId).then((data) => setContentItem(data as IContentItem))

  }, []);


  const openPhone = () => {
    if (contentItem.phoneNumber) {
      contentItem.phoneNumber = contentItem.phoneNumber.replace(/[^0-9+]/g, '');
      let link;

      if (Platform.OS === 'ios') {
        link = 'telprompt:${' + contentItem.phoneNumber + '}';
      }
      else {
        link = 'tel:' + contentItem.phoneNumber;
      }
      Linking.openURL(link);
    }

  }

  const openSMS = () => {
    if (contentItem.phoneNumber) {
      contentItem.phoneNumber = contentItem.phoneNumber.replace(/[^0-9+]/g, '');
      sms(contentItem.phoneNumber, "").catch(console.error);
    }
  }

  let content;
  switch (contentItem.contentType) {
    case ContentType.Text: {
      content = <View style={styles.contentContainer}><View style={styles.contentHolder}><Text style={styles.textItem}>{contentItem.text}</Text></View></View>
      break;
    }
    case ContentType.PhoneNumber: {
      content = (<View style={styles.contentContainer}><View style={styles.contentHolder}><Text style={styles.title}>{contentItem.text}</Text>
        <View style={styles.callIcons}><TouchableOpacity onPress={openPhone}><Feather name="phone-call" size={34} color="green" /></TouchableOpacity><TouchableOpacity onPress={openSMS}><MaterialIcons name="sms" size={34} color="green" /></TouchableOpacity></View>
      </View></View>)
      break;
    }
    case ContentType.Url: {
      content = <View style={styles.contentContainer}><View style={styles.contentHolder}><Text style={styles.title}>{contentItem.text}</Text><LinkPreview text={contentItem.url as string} /></View></View>
      break;
    }
    case ContentType.Image: {
      content = <View style={styles.contentContainer}><View style={styles.contentHolder}><Image style={styles.image} source={{
        uri: contentItem.imageUri
      }}></Image></View><Text style={styles.title}>{contentItem.title}</Text></View>
      break;
    }
    default: {
      //statements; 
      break;
    }
  }
  const schedulingShow = () => {
    setShowScheduling(true);

  }

  const onTimeChange = (event: any, selectedDate: any) => {
    setTime(selectedDate);
    setShowTimePicker(false);
  }

  const scheduleMessage = () => {
    setShowScheduling(false);

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

  let scheduling = null;
  let timePicker = null;

  const openTimePicker = () => {
    setShowTimePicker(true);
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

    scheduling = (<View style={styles.contentCards}><SelectWidget selectionItems={daysInWeek} onSelect={setDay} />
      {timePicker}
      <View style={styles.button}><AddButton onPress={scheduleMessage}>Schedule message</AddButton></View></View>)

  }
  const unschedule = () => {
    Notifications.cancelAllScheduledNotificationsAsync()
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/dashboard_background.png')} style={styles.background}>
        {content}
        {scheduling}
        <AddButton onPress={unschedule}>Unschedule</AddButton>
        <View style={styles.buttonArea}><AddButton onPress={schedulingShow} width={Layout.window.width * 0.3}>Schedule</AddButton><AddButton width={Layout.window.width * 0.3}>Delete</AddButton><AddButton width={Layout.window.width * 0.3}>Edit</AddButton></View>
      </ImageBackground>
    </View>

  );
}

export default ContentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent'
  },

  contentHolder: {
    //backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 8,
    width: Layout.window.width * 0.9,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',

  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Layout.window.height,
    width: Layout.window.width,
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  contentCards: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
    width: Layout.window.width * 0.9
  },
  cardRow: {
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  textItem: {
    backgroundColor: 'white',
    color: Colors.brown,
    padding: 40,
    fontSize: 20,
    textAlign: 'center'

  },
  button: {
    backgroundColor: 'transparent',
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: Colors.brown


  },
  callIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10
  },
  image: {
    width: Layout.window.width * 0.9,
    height: Layout.window.height * 0.4

  }
});


