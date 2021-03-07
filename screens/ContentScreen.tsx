import * as React from 'react';
import { StyleSheet } from 'react-native';
import NavigationCard from '../components/NavigationCard';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';

const ContentScreen = () => {

  return (
    <View style={styles.container}>
      <Text>Content goes here</Text>
      <NavigationCard text='Manage your wellness messages' screenName='ManageWellnessMessage' height={Layout.window.width * 0.1} width={Layout.window.width * 0.8}></NavigationCard>
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