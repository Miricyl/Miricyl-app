import React, { useState } from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import * as WebBrowser from 'expo-web-browser';
import { ContentType, INavigationCardDetails, LinkType } from '../types';
import Layout from '../constants/Layout';



const NavigationCard = ({ text, subheading, link, linkType, CardType = "Dashboard", height = '100%', width = '100%' }: INavigationCardDetails) => {
  const navigation = useNavigation();
  var onPressFunction: any;



  switch (linkType) {
    case LinkType.Screen:
      onPressFunction = () => {
        navigation.navigate(link);
      }
      break;
    case LinkType.Url:
      onPressFunction = () => {WebBrowser.openBrowserAsync(link)}
      break;

    default: {
      break;
    }
  }


  let card;

  switch (CardType) {
    case "SelfCare":
      card = <>
                <View style={styles.messageCardSelfCare}>
                <TouchableOpacity style={styles.touchableOpacitySelfCare} onPress={onPressFunction}>
                    <Text style={styles.cardTextSelfCare}>{text}</Text>
                    <Text style={styles.cardSubheadingSelfCare}>{subheading}</Text>
              </TouchableOpacity>
            </View>
            </>
      break;

    case "Dashboard":
      card =  <><View style={styles.messageCard}>
                <TouchableOpacity style={styles.touchableOpacityDashboard} onPress={onPressFunction}>
                    <Text style={styles.cardTextDashboard}>{text}</Text>
                    <Image 
                      source={require('../assets/icons/navigatorCardArrow.png')} 
                      style={styles.navigatorCardArrow}/>
                </TouchableOpacity>
              </View></>
       break;

    default: {
      break;
    }
  }

  return (card);
}

export default NavigationCard;

const styles = StyleSheet.create({
  messageCard: {
    width: Layout.window.width * 0.65,
    height: Layout.window.height * 0.075,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageCardSelfCare: {
    width: Layout.window.width * 0.75,
    height: Layout.window.height * 0.1,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableOpacityDashboard: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:10
  },
  touchableOpacitySelfCare: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 5
  },
  cardTextDashboard:{
    fontSize: 18,
    color: Colors.light.text,
  },
  cardTextSelfCare:{
    fontSize: 20,
    color: '#8B2B0F',
    fontWeight: '700',
  },
  cardSubheadingSelfCare: {
    marginTop: 3,
    padding: 5,
    textAlign: 'center',
  },
  navigatorCardArrow: {
    marginLeft: 15,
    width: 18,
    height: 18,
  }

});
