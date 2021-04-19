import * as React from 'react';
import { Linking, Platform, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import NavigationCard from '../components/NavigationCard';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import { CategoryType, ContentType, IContentItem, Props } from '../types';
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



const ContentScreen = ({ navigation,route }:Props) => {
  //content screen should allow you to schedule message and delete item.
  const {contentId} = route.params;
  const [contentItem, setContentItem] = useState<IContentItem>({category:CategoryType.Joy,id:'unknown',contentType:ContentType.Text});
  const [showScheduling, setShowScheduling]=useState<boolean>(false);
  const [time,setTime] = useState(new Date());
  const [day,setDay] = useState("Monday");
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
      content = <Text style={styles.textItem}>{contentItem.text}</Text>
      break;
    }
    case ContentType.PhoneNumber: {
      content = (<View><Text style={styles.title}>{contentItem.text}</Text>
        <View style={styles.callIcons}><TouchableOpacity onPress={openPhone}><Feather name="phone-call" size={34} color="green" /></TouchableOpacity><TouchableOpacity onPress={openSMS}><MaterialIcons name="sms" size={34} color="green" /></TouchableOpacity></View>
      </View>)
      break;
    }
    case ContentType.Url: {
      content = <View><Text style={styles.title}>{contentItem.text}</Text><LinkPreview text={contentItem.url as string}/></View>
      break;
    }
    case ContentType.Image: {
      content = <View style={styles.contentHolder}><Image style={styles.image} source={{
        uri: contentItem.imageUri
      }}></Image><Text style={styles.title}>{contentItem.title}</Text></View>
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

  const onTimeChange = (event:any, selectedDate:any) => {
      setTime(selectedDate);
  }

  const scheduleMessage = ()=>{
    setShowScheduling(false);
    console.log(day);
    console.log(time);
  }
  
  const daysInWeek:any[]=[
    { label: "Monday", value: "Monday"},
    { label: "Tuesday", value: "Tuesday"}
]
  let scheduling;
  if(showScheduling){

    scheduling = (<View><SelectWidget selectionItems={daysInWeek} onSelect={setDay}/><DateTimePicker
      testID="dateTimePicker"
      value={time}
      mode='time'
      is24Hour={true}
      display="default"
      onChange={onTimeChange}
    /><View style={styles.button}><AddButton onPress={scheduleMessage}></AddButton></View></View>)

  }
  else{
      scheduling = <View style={styles.button}><TouchableOpacity onPress={schedulingShow}><Text>Schedule</Text></TouchableOpacity></View>
  }

  return (
    <View style={styles.container}>
      <ScrollView><ImageBackground source={require('../assets/images/dashboard_background.png')} style={styles.background}>  
    {content}
    <View style={styles.contentCards}>
    {scheduling}
    </View>
    </ImageBackground></ScrollView>
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
  contentHolder: {
    backgroundColor: 'transparent',
    alignItems:'center'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Layout.window.height,
    width: Layout.window.width, 
  },
  contentCards: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
  },
  cardRow: {
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  textItem: {
    backgroundColor: Colors.primary,
    color: 'white',
    padding: 10,
    fontSize:20,
    textAlign:'center'

  },
  button:{
    backgroundColor:'orange',
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color:Colors.brown


  },
  callIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin:10
  },
  image:{
    width: Layout.window.width * 0.9,
    height:Layout.window.height * 0.4

  }
});


// Notifications.scheduleNotificationAsync({
//   content: {
//     title: 'Happy new hour!',
//   },
//   trigger: {
//   hours: 20,
//   minute: 0,
//   repeats: true
// });