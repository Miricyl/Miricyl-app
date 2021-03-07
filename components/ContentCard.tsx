import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { HeaderHeightContext } from '@react-navigation/stack';
import { ContentCardDetails, ContentType } from '../types';



const ContentCard = ({ text, image, url, contentType, height='100%', width='100%' }: ContentCardDetails) => {
  const navigation = useNavigation();

  let content;
  switch (contentType) {
    case ContentType.Text: {
      content = <Text style={{ ...styles.cardText, height: height, width: width }}>{text}</Text>
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
    backgroundColor: "orange",
    margin: '5%',
    padding: 10
  },
  cardText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
