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
        <ScrollView>
          <ImageBackground source={require('../assets/images/dashboard_background.png')} style={styles.background}>   
            <View style={styles.imagePlusText}>
              <Image style={styles.welcomeImage} source={require('../assets/images/welcomeImage.jpg')}/>
              <Text style={styles.welcomeText}>We are here for you if you need trusted guidance on accessing resources and services that can positively impact your mental health. We will guide you in finding the treatment and help you need.</Text>
            </View>
            <View style={styles.navigationCards}>
              <NavigationCard  CardType='Dashboard' text='Search Recources' link='https://help.miricyl.org/' linkType={LinkType.Url}></NavigationCard>
              <NavigationCard  CardType='Dashboard' text='Info &#38; Advice' link='https://help.miricyl.org/' linkType={LinkType.Url}></NavigationCard>
              <NavigationCard  CardType='Dashboard' text='Register for counselling' link='https://help.miricyl.org/' linkType={LinkType.Url}></NavigationCard>
              <NavigationCard  CardType='Dashboard' text='Self care' link='SelfCare' linkType={LinkType.Screen}></NavigationCard>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Layout.window.height,
    width: Layout.window.width,
  },
  imagePlusText: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  navigationCards: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
  },
  welcomeText: {
    marginLeft: 70,
    marginRight: 70,
    textAlign: 'center',
    fontSize: 15,
    color: '#8b2b0f',
    marginBottom: 30,
    lineHeight: 20,
  },
  welcomeImage: {
    borderRadius: 100,
    marginBottom: 30,
    height: Layout.window.height * 0.15,
    width: Layout.window.width * 0.30,
  }
});


