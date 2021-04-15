import React from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { INavigationCardDetails, ISelectionButtonDetails, LinkType } from '../types';
import Layout from '../constants/Layout';



const SelectionButton = ({ text, onPressFunction }: ISelectionButtonDetails) => {




  return (

      <View style={styles.messageCard}>
        <TouchableOpacity style={styles.touchableOpacity} onPress={onPressFunction}> 
            <Text style={styles.text}>
            {text}
            </Text>
      </TouchableOpacity>
    </View>
  );
}

export default SelectionButton;

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
  touchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:10

  },
  text:{
    fontSize: 18,
    color: Colors.light.text,
    
  },
 

});