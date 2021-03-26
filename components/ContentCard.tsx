import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { IContentItem, ContentType } from '../types';
import RNUrlPreview from 'react-native-url-preview';
import Layout from '../constants/Layout';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { Linking } from 'react-native';
import sms from 'react-native-sms-linking';


const ContentCard = ({ text, url, phoneNumber, type }: IContentItem) => {
  const navigation = useNavigation();

  const openPhone = () => {
    if (phoneNumber) {
      phoneNumber = phoneNumber.replace(/[^0-9+]/g, '');
      let link;

      if (Platform.OS === 'ios') {
        link = 'telprompt:${' + phoneNumber + '}';
      }
      else {
        link = 'tel:' + phoneNumber;
      }
      Linking.openURL(link);
    }

  }

  const openSMS = () => {
    if (phoneNumber) {
      phoneNumber = phoneNumber.replace(/[^0-9+]/g, '');
      sms(phoneNumber, "").catch(console.error);
    }
  }

  let content;
  switch (type) {
    case ContentType.Text: {
      content = <Text style={styles.textItem}>{text}</Text>
      break;
    }
    case ContentType.PhoneNumber: {
      content = (<View><Text style={styles.title}>{text}</Text>
        <View style={styles.callIcons}><TouchableOpacity onPress={openPhone}><Feather name="phone-call" size={34} color="green" /></TouchableOpacity><TouchableOpacity onPress={openSMS}><MaterialIcons name="sms" size={34} color="green" /></TouchableOpacity></View>
      </View>)
      break;
    }
    case ContentType.Url: {
      content = <View><Text style={styles.title}>{text}</Text><RNUrlPreview text={url} /></View>
      break;
    }
    default: {
      //statements; 
      break;
    }
  }


  return (

    <View style={styles.messageCard}>

      {content}

    </View>

  );
}

export default ContentCard;

const styles = StyleSheet.create({
  messageCard: {
    width: Layout.window.width * 0.85,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 5,
    margin: '2%',
    padding: 5,

  },
  cardText: {
    width: '100%',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  textItem: {
    backgroundColor: Colors.primary,
    color: 'white',
    padding: 10,

  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  callIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin:10
  }
});
