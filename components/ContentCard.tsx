import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { IContentItem, ContentType } from '../types';
import RNUrlPreview from 'react-native-url-preview';
import Layout from '../constants/Layout';



const ContentCard = ({ text, url, phoneNumber,type}: IContentItem) => {
  const navigation = useNavigation();

  let content;
  switch (type) {
    case ContentType.Text: {
      content = <Text>{text}</Text>
      break;
    }
    case ContentType.PhoneNumber: {
      content =<View><Text>{phoneNumber}</Text><Text>{text}</Text></View>
      break;
    }
    case ContentType.Url: {
      content =<View><RNUrlPreview text={url}/></View>
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
    height: Layout.window.width * 0.45,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    margin: '2%',
    padding: 5,

  },
  cardText: {
    width:'100%',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
