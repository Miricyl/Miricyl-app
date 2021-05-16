import React, { useState } from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { Text, View } from './Themed';
import * as WebBrowser from 'expo-web-browser';
import { ContentType, INavigationCardDetails, LinkType } from '../types';
import Layout from '../constants/Layout';


const NavigationCard = ({ text, subheading, link, linkType, CardType = "Dashboard", category, height = '100%', width = '100%' }: INavigationCardDetails) => {
  const navigation = useNavigation();
  var onPressFunction: any;

  switch (linkType) {
    case LinkType.Screen:
      if (category) {
        onPressFunction = () => {
          navigation.navigate(link, {
            category: category
          });

        }
      }
      else {
        onPressFunction = () => {
          navigation.navigate(link);
        }
      }
      break;
    case LinkType.Url:
      onPressFunction = () => { WebBrowser.openBrowserAsync(link) }
      break;

    default: {
      break;
    }
  }


  let card;

  switch (CardType) {
    case "rectNavCard":
      card =
       <>
        <TouchableOpacity style={styles.rectCard} onPress={onPressFunction}>
          <Text style={styles.rectCardText}>{text}</Text>
          <AntDesign style={styles.rightArrow} name="right" size={24} color={Colors.light.navCardText} />
        </TouchableOpacity>
      </>
      break;

    case "square":
      card = 
        <>
          <TouchableOpacity style={styles.squareCard} onPress={onPressFunction}>
            <Text style={styles.squareCardText}>{text}</Text>
          </TouchableOpacity>
        </>
      break;

    default: {
      break;
    }
  }

  return (
    <>{card}</>
  );
}

export default NavigationCard;

const styles = StyleSheet.create({

  squareCard: {
    width: Layout.window.width * 0.42,
    height: Layout.window.height * 0.23,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 50,
    backgroundColor: 'radial-gradient(circle, rgba(238,178,47,1) 0%, rgba(252,212,49,1) 56%)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectCard: {
    flexDirection: 'row',
    width: Layout.window.width * 0.8,
    height: Layout.window.height * 0.1,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 25,
    backgroundColor: 'radial-gradient(circle, rgba(238,178,47,1) 0%, rgba(252,212,49,1) 56%)',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rectCardText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.navCardText,
    marginLeft: 25,
  },
  rightArrow: {
    marginLeft: 'auto',
    marginRight: 15,
  },
  squareCardText: {
    fontSize: 18,
    color: Colors.light.navCardText,
  },
});
