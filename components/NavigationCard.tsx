import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { HeaderHeightContext } from '@react-navigation/stack';
import { INavigationCardDetails } from '../types';



const NavigationCard = ({text,screenName, height='100%', width='100%'}:INavigationCardDetails ) => {
  const navigation = useNavigation();

  return (
      <View style={styles.messageCard}>
        <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: "orange",
    margin:'5%',
    padding: 10
  },
  cardText:{
    color:'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
