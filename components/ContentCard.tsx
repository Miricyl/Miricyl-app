import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { IContentItem, ContentType } from '../types';
import Layout from '../constants/Layout';
import { Feather, MaterialIcons } from '@expo/vector-icons';
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

  const openSMS = () => {
    if (contentItem.phoneNumber) {
      contentItem.phoneNumber = contentItem.phoneNumber.replace(/[^0-9+]/g, '');
      sms(contentItem.phoneNumber, "").catch(console.error);
    }
  }

  let content;
  switch (contentItem.contentType) {
    case ContentType.Text: {
      content = <TouchableOpacity onPress={goToContentScreen}><Text style={styles.textItem}>{contentItem.text}</Text></TouchableOpacity>
      break;
    }
    case ContentType.PhoneNumber: {
      content = (<View><TouchableOpacity onPress={goToContentScreen}><Text style={styles.title}>{contentItem.text}</Text></TouchableOpacity>
        <View style={styles.callIcons}><TouchableOpacity onPress={openPhone}><Feather name="phone-call" size={34} color="green" /></TouchableOpacity><TouchableOpacity onPress={openSMS}><MaterialIcons name="sms" size={34} color="green" /></TouchableOpacity></View>
      </View>)
      break;
    }
    case ContentType.Url: {
      content = <View><TouchableOpacity onPress={goToContentScreen}><Text style={styles.title}>{contentItem.text}</Text></TouchableOpacity><LinkPreview text={contentItem.url as string} /></View>
      break;
    }
    case ContentType.Image: {
      content = <View><TouchableOpacity onPress={goToContentScreen}><Image source={{ uri: contentItem.imageUri }} style={styles.image} /></TouchableOpacity></View>
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
  image: {
    width: Layout.window.width * 0.45,
    height: 350,

  },
  messageCard: {
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    width: Layout.window.width * 0.45,
    height: 350,
    marginTop: 10,
    marginBottom: 10

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
    textAlign: 'center'

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
    margin: 10
  }
});
