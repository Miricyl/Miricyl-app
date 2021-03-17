import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { INavigationCardDetails, LinkType } from '../types';



const NavigationCard = ({ text, link, linkType, height = '100%', width = '100%' }: INavigationCardDetails) => {
  const navigation = useNavigation();
  var onPressFunction: any;

  switch (linkType) {
    case LinkType.Screen:
      onPressFunction = () => {
        navigation.navigate(link);
      }
    case LinkType.Url:
      //onPressFunction = () => { }//TODO: handle Url links

    default: {
      break;
    }
  }


  return (

      <View style={styles.messageCard}>
        <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate(screenName)}>
        <Text style={{...styles.cardText, height:height, width:width}}>

          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default NavigationCard;

const styles = StyleSheet.create({
  messageCard: {
    width: '70%',
    height: '8%',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 25,
    backgroundColor: 'white',
    margin:'5%',
    padding: 20 
  },
  cardText:{
    fontSize: 18,
    color:'#8b2b0f',

    textAlign: 'center',
    textAlignVertical: 'center'
  },
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
