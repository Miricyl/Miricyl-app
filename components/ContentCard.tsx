import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { IContentItem, ContentType } from '../types';
import RNUrlPreview from 'react-native-url-preview';



const ContentCard = ({ text, url, phoneNumber,type}: IContentItem) => {
  const navigation = useNavigation();

  let content;
  switch (type) {
    case ContentType.Text: {
      content = <Text style={styles.cardText}>{text}</Text>
      break;
    }
    case ContentType.PhoneNumber: {
      content =<View><Text style={styles.cardText}>{text}</Text><Text>{phoneNumber}</Text> </View>
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
      {/* PUT LINK TO CONTENT PAGE <TouchableOpacity onPress={() => navigation.navigate()}> */}
      {content}

    </View>
  );
}

export default ContentCard;

const styles = StyleSheet.create({
  messageCard: {
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
    height: 80,
    width: 160
  },
  cardText: {
    width:'100%',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
