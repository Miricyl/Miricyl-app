import React, { useState } from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text} from './Themed';
import * as WebBrowser from 'expo-web-browser';
import { INavigationCardDetails, LinkType } from '../types';
import Layout from '../constants/Layout';


const NavigationCard = ({ text, link, children, linkType, CardType = "rectNavCard", category, height = '100%', width = '100%' }: INavigationCardDetails) => {
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
        
        <TouchableOpacity  onPress={onPressFunction}>
          <LinearGradient 
            colors={['#faba15', '#fcd12f']}
            start={{x: 0.2, y: 0.3}}
            end={{x: 0.8, y: 0.7}}
            style={styles.rectCard}>
              <Text style={styles.rectCardText}>{text}</Text>
              <AntDesign style={styles.rightArrow} name="right" size={24} color={Colors.light.text} />
          </LinearGradient>
        </TouchableOpacity>
      </>
      break;

    case "square":
      card = 
        <>
          {/* <TouchableOpacity onPress={onPressFunction}>
            <LinearGradient 
              colors={['#faba15', '#fcd12f']}
              start={{x: 0.2, y: 0.3}}
              end={{x: 0.8, y: 0.7}}
              style={styles.squareCard}>
                <Text style={styles.squareCardText}>{text}</Text>
                 {children}
            </LinearGradient>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.squareCard} onPress={onPressFunction}>
                <Text style={styles.squareCardText}>{text}</Text>
                 {children}
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
    backgroundColor: 'green',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 50,
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
    backgroundColor: "#fc472f",
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rectCardText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
    marginLeft: 25,
  },
  rightArrow: {
    marginLeft: 'auto',
    marginRight: 15,
  },
  squareCardText: {
    fontSize: 18,
    color: Colors.light.text,
    marginTop: 70,
    textAlign: 'center',
  },
});
