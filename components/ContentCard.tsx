import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { IContentCardDetails, ContentType } from '../types';



const ContentCard = ({ text, image, url, contentType, height='100%', width='100%' }: IContentCardDetails) => {
  const navigation = useNavigation();

  let content;
  switch (contentType) {
    case ContentType.Text: {
      content = <Text style={styles.cardText}>{text}</Text>
      break;
    }
    case ContentType.Image: {
      //statements; 
      break;
    }
    case ContentType.Url: {
      //statements; 
      break;
    }
    default: {
      //statements; 
      break;
    }
  }


  return (
    <View style={{...styles.messageCard, height: height, width: width}}>
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
    padding: 5
  },
  cardText: {
    width:'100%',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
