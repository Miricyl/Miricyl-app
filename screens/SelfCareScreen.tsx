import * as React from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationCard from '../components/NavigationCard';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import { LinkType } from '../types';

import { AntDesign } from '@expo/vector-icons';

const SelfCareScreen = () => {

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.ScrollViewContainer}>
          <View style={styles.rowsContainer}>
            <View style={styles.navCardsRow}>
              <NavigationCard CardType='square' text='Create a Message' link='CreateAMessage' linkType={LinkType.Screen}></NavigationCard>
              <NavigationCard CardType='square' text='Choose from Community' link='' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
            </View>
            <View style={styles.navCardsRow}>
              <NavigationCard CardType='square' text='My Messages' link='Joy' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
              <NavigationCard CardType='square' text='My Plans' link='' linkType={LinkType.Screen}></NavigationCard>
            </View> 
            </View>  
      </ScrollView>
    </View>

  );
}

export default SelfCareScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  ScrollViewContainer: {
    backgroundColor:'rgb(162, 232, 209)',
    flex: 1,
  },
  rowsContainer: {
    marginTop: 'auto',
    marginBottom: 1,
    flex: 0.65,
    backgroundColor: 'transparent',
    justifyContent:'space-around',
  },
  navCardsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
  },
});
