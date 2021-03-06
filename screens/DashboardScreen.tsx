import * as React from 'react';
import { StyleSheet } from 'react-native';
import NavigationCard from '../components/NavigationCard';
import { Text, View } from '../components/Themed';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <NavigationCard text='Things that bring me joy' screenName='Joy' ></NavigationCard>
    </View>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
