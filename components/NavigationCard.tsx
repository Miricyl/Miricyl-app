import React from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { INavigationCardDetails, LinkType } from '../types';
import Layout from '../constants/Layout';



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
        <TouchableOpacity style={styles.touchableOpacity} onPress={onPressFunction}>
            {/* <Text style={{...styles.cardText, height:height, width:width}}> */} 
            <Text style={styles.cardText}>
            {text}
            </Text>
            <Image 
              source={require('../assets/icons/navigatorCardArrow.png')} 
              style={styles.navigatorCardArrow}/>
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
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText:{
    fontSize: 18,
    color:'#8b2b0f',
  },
  navigatorCardArrow: {
    marginLeft: 15,
    width: 18,
    height: 18,
  }

});
