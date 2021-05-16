import Constants from 'expo-constants';
import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, ImageBackground, Image, Linking, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationCard from '../components/NavigationCard';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import { LinkType } from '../types'
import { StorePushToken } from './storage/pushNotificationStorage';
import * as Notifications from 'expo-notifications'
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {

  const navigation = useNavigation();

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    }
    else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    registerForPushNotificationsAsync()

  }, []);

  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data.url &&
      lastNotificationResponse.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      navigation.navigate('Content', {
        contentId: lastNotificationResponse.notification.request.content.data.id
      });
    }
  }, [lastNotificationResponse]);

  return (
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.ScrollViewContainer}> 
            <View style={styles.navigationCards}>
              <NavigationCard  CardType='Dashboard' text='Search Recources' link='https://help.miricyl.org/' linkType={LinkType.Url}></NavigationCard>
              <NavigationCard  CardType='Dashboard' text='Info &#38; Advice' link='https://help.miricyl.org/' linkType={LinkType.Url}></NavigationCard>
              <NavigationCard  CardType='Dashboard' text='Register for counselling' link='https://help.miricyl.org/' linkType={LinkType.Url}></NavigationCard>
              <NavigationCard  CardType='Dashboard' text='Self care' link='SelfCare' linkType={LinkType.Screen}></NavigationCard>
            </View>
        </ScrollView>
      </View>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    flex: 1,
  },
  ScrollViewContainer: {
    backgroundColor:'rgb(162, 232, 209)',
    flex: 1,
  },
  navigationCards: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
  },

});