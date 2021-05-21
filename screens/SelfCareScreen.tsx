import * as React from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationCard from '../components/NavigationCard';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import { LinkType } from '../types';
import Colors from '../constants/Colors';

//ICONS LIBRARIES
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';


const SelfCareScreen = () => {

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.ScrollViewContainer}>
          <View style={styles.rowsContainer}>
            <View style={styles.navCardsRow}>
              <NavigationCard CardType='square' text='Create a Message' link='CreateAMessage'linkType={LinkType.Screen}>
                <AntDesign style={styles.cardIcon} name="message1" size={50} color={Colors.light.text}  />
              </NavigationCard>
              <NavigationCard CardType='square' text='Choose from Community' link='' linkType={LinkType.Screen}>
                <FontAwesome style={styles.cardIcon} name="group"  size={45} color={Colors.light.text} />
              </NavigationCard>
            </View>
            <View style={styles.navCardsRow}>
              <NavigationCard CardType='square' text='My Messages'link='MyMessages' linkType={LinkType.Screen}>
                <FontAwesome style={styles.cardIcon} name="envelope" size={50} color={Colors.light.text}  />
              </NavigationCard>
              <NavigationCard CardType='square' text='My Plans' link='' linkType={LinkType.Screen}>
                <MaterialCommunityIcons style={styles.cardIcon} name="file-document-outline" size={50} color={Colors.light.text}  />
              </NavigationCard>
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
    backgroundColor: Colors.light.secondary,
    flex: 1,
  },
  rowsContainer: {
    marginBottom: 1,
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  navCardsRow: {
    flexDirection: 'row',
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
  },
  cardIcon: {
    position: "absolute",
    top: 40,
    margin: 'auto',
    marginTop: 10,
  },
});
