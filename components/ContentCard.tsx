import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { IContentItem, ContentType, Weekday, Frequency } from '../types';
import Layout from '../constants/Layout';
import { FontAwesome5, MaterialIcons, EvilIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { Linking } from 'react-native';
import sms from 'react-native-sms-linking';
import { LinkPreview } from '@flyerhq/react-native-link-preview';


const ContentCard = (contentItem: IContentItem) => {
  const navigation = useNavigation();

  const goToContentScreen = () => {
    navigation.navigate('Content', {
      contentId: contentItem.id
    });
  }

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

  const popUpDelete = () => {

    //do pop up here
  }

  const openSMS = () => {
    if (contentItem.phoneNumber) {
      contentItem.phoneNumber = contentItem.phoneNumber.replace(/[^0-9+]/g, '');
      sms(contentItem.phoneNumber, "").catch(console.error);
    }
  }

  let thumbnail;
  switch (contentItem.contentType) {
    case ContentType.PhoneNumber: {
      thumbnail = (
        <View style={styles.thumbnail}><TouchableOpacity onPress={openPhone}><FontAwesome5 name="phone-square-alt" size={65} color={Colors.light.subtitle} /></TouchableOpacity></View>)
      break;
    }

    case ContentType.Image: {
      thumbnail = <View style={styles.thumbnail}><TouchableOpacity onPress={goToContentScreen}><Image source={{ uri: contentItem.imageUri }} style={styles.image} /></TouchableOpacity></View>
      break;
    }
    default: {
      //statements; 
      break;
    }
  }
  let schedule = "";
  if (contentItem.schedulingDetails) {
    if (contentItem.schedulingDetails.day) {
      schedule = Weekday[contentItem.schedulingDetails.day] + " " + contentItem.schedulingDetails.hour + " " + Frequency[contentItem.schedulingDetails.frequency];
    }
  }

  return (

    <View style={styles.messageCard}>
      <View style={styles.content}>{thumbnail}
      <View style={styles.textContent}>
        <View><TouchableOpacity onPress={goToContentScreen}><Text style={styles.title}>{contentItem.text}</Text></TouchableOpacity></View>
        <View><Text style={styles.schedule}>{schedule}</Text></View>
      </View></View>
      <View style={styles.delete}><TouchableOpacity onPress={popUpDelete}><EvilIcons name="close" size={24} color="black" /></TouchableOpacity></View>

    </View>

  );
}

export default ContentCard;

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 65,


  },
  messageCard: {
    justifyContent: 'space-between',
    flexDirection:'row',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    width: Layout.window.width * 0.90,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',
    padding: 20

  },  
  content:{
    justifyContent: 'flex-start',
    flexDirection:'row',
  },
  thumbnail: {
    marginRight:20,
  },

  textContent: {
    justifyContent: 'space-between',
    width:'auto',
  },
  delete: {
    backgroundColor: '#f2f2f0',
    paddingHorizontal: 3,
    paddingVertical: 3,
    borderRadius: 5,
    width:29,
    height:29

  },
  cardText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
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

});
