import * as React from 'react';
import { StyleSheet } from 'react-native';
import NavigationCard from '../components/NavigationCard';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import { LinkType } from '../types';
import RNUrlPreview from 'react-native-url-preview';

const ContentScreen = () => {

  const urlPreview = <RNUrlPreview text={"https://reactnativeforyou.com"}/>

  return (
    <View style={styles.container}>
      <Text>Content goes here</Text>
      {urlPreview}
      <NavigationCard text='Manage your wellness messages' link='ManageWellnessMessage' linkType={LinkType.Screen} height={Layout.window.width * 0.1} width={Layout.window.width * 0.8}></NavigationCard>
    </View>
 
  );
}

export default ContentScreen;

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