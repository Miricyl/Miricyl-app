import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationCard from '../components/NavigationCard';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import {LinkType} from '../types'

const DashboardScreen = () => {

  return (
    <View style={styles.container}>
      <NavigationCard text='Other menu item' link='https:\\www.somewhere.com' linkType={LinkType.Url} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
      <NavigationCard text='Self care' link='SelfCare' linkType={LinkType.Screen} height={Layout.window.width * 0.2} width={Layout.window.width * 0.8}></NavigationCard>
    </View>
 
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  cardRow: {
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  }
});
