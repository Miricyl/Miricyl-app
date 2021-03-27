import * as React from 'react';
import { Linking, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import NavigationCard from '../components/NavigationCard';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import { CategoryType, ContentType, IContentItem, Props } from '../types';
import { useEffect, useState } from 'react';
import { LoadItem } from '../storage/ContentStorage';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import sms from 'react-native-sms-linking';


const ContentScreen = ({ navigation,route }:Props) => {
  //content screen should allow you to schedule message and delete item.
  const {contentId} = route.params;
  const [contentItem, setContentItem] = useState<IContentItem>({category:CategoryType.Joy,id:'unknown',contentType:ContentType.Text});

  useEffect(() => {
       
    LoadItem(contentId).then((data) => setContentItem(data as IContentItem))
    
}, []);


const openPhone = () => {
  if (contentItem.phoneNumber) {
    contentItem.phoneNumber = contentItem.phoneNumber.replace(/[^0-9+]/g, '');
    let link;

    if (Platform.OS === 'ios') {
      link = 'telprompt:${' + contentItem.phoneNumber + '}';
    }
    else {
      link = 'tel:' + contentItem.phoneNumber;
    }
    Linking.openURL(link);
  }

}

const openSMS = () => {
  if (contentItem.phoneNumber) {
    contentItem.phoneNumber = contentItem.phoneNumber.replace(/[^0-9+]/g, '');
    sms(contentItem.phoneNumber, "").catch(console.error);
  }
}

let content;
  switch (contentItem.contentType) {
    case ContentType.Text: {
      content = <Text style={styles.textItem}>{contentItem.text}</Text>
      break;
    }
    case ContentType.PhoneNumber: {
      content = (<View><Text style={styles.title}>{contentItem.text}</Text>
        <View style={styles.callIcons}><TouchableOpacity onPress={openPhone}><Feather name="phone-call" size={34} color="green" /></TouchableOpacity><TouchableOpacity onPress={openSMS}><MaterialIcons name="sms" size={34} color="green" /></TouchableOpacity></View>
      </View>)
      break;
    }
    case ContentType.Url: {
      content = <View><Text style={styles.title}>{contentItem.text}</Text></View>
      break;
    }
    default: {
      //statements; 
      break;
    }
  }

  return (
    <View style={styles.container}>
    {content}
    
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
  },
  textItem: {
    backgroundColor: Colors.primary,
    color: 'white',
    padding: 10,
    fontSize:20,
    textAlign:'center'

  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  callIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin:10
  }
});

function type<T>(arg0: { category: CategoryType.Joy; id: string;  contentType: any; text: ContentType;}): [any, any] {
  throw new Error('Function not implemented.');
}
