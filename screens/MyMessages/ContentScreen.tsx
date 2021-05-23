import * as React from 'react';
import { Linking, ScrollView, Platform, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, View } from '../../components/Themed';
import Layout from '../../constants/Layout';
import { CategoryType, ContentType, IContentItem, ContentProps } from '../../types';
import { useEffect, useState } from 'react';
import { LoadItem } from '../../storage/ContentStorage';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import sms from 'react-native-sms-linking';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectWidget from '../../components/SelectWidget';
import AddButton from '../../components/AddButton';
import * as Notifications from 'expo-notifications'
import { useNavigation } from '@react-navigation/native';


const ContentScreen = ({ navigation, route }: ContentProps) => {
  //content screen should allow you to schedule message and delete item.
  const { contentId } = route.params;
  const [contentItem, setContentItem] = useState<IContentItem>();

  const nav = useNavigation();

  useEffect(() => {

    LoadItem(contentId).then((data) => setContentItem(data as IContentItem))

  }, []);


  const openPhone = () => {
    console.log(contentItem);
    if (contentItem) {
      if (contentItem.phoneNumber) {
        contentItem.phoneNumber = contentItem.phoneNumber.replace(/[^0-9+]/g, '');
        let link;

        if (Platform.OS === 'ios') {
          link = 'telprompt:${' + contentItem.phoneNumber + '}';
         
        }
        else {
          link = 'tel:' + contentItem.phoneNumber;
        }
        Linking.openURL(link).catch(() => null);
      }
    }

  }

  const openSMS = () => {
    if (contentItem) {
      if (contentItem.phoneNumber) {
        contentItem.phoneNumber = contentItem.phoneNumber.replace(/[^0-9+]/g, '');
        sms(contentItem.phoneNumber, "").catch(console.error);
      }
    }
  }

  const goToEditing = () => {
    if (contentItem) {
      nav.navigate('CreateMessage', {    
        category:contentItem.category,
        contentId: contentItem.id
      })
    }
  }


  const goToScheduling = () => {
    if (contentItem) {
      nav.navigate('Scheduling', {
        contentId: contentItem.id
      })
    }
  }

  let content;
  if (contentItem) {
    switch (contentItem.contentType) {
      case ContentType.Text: {
        content = <View style={styles.contentContainer}>
          <Text style={styles.title}>{contentItem.title}</Text>
          <View style={styles.contentHolder}><Text style={styles.textItem}>{contentItem.text}</Text></View>
          </View>
        break;
      }
      case ContentType.PhoneNumber: {
        content = (<View style={styles.contentContainer}><Text style={styles.title}>{contentItem.title}</Text><View style={styles.contentHolder}>
          <View style={styles.callIcons}><TouchableOpacity onPress={openPhone}><Feather name="phone-call" size={55} color={Colors.light.subtitle} /></TouchableOpacity><TouchableOpacity onPress={openSMS}><MaterialIcons name="sms" size={55} color={Colors.light.subtitle} /></TouchableOpacity></View>
        </View></View>)
        break;
      }
      case ContentType.Url: {
        content = <View style={styles.contentContainer}><Text style={styles.title}>{contentItem.title}</Text><View style={styles.contentHolder}><Text style={styles.title}>{contentItem.text}</Text><LinkPreview text={contentItem.url as string}/></View></View>
        break;
      }
      case ContentType.Image: {
        content = <View style={styles.contentContainer}><Text style={styles.title}>{contentItem.title}</Text><View style={styles.contentHolder}><Image style={styles.image} source={{
          uri: contentItem.imageUri
        }}></Image></View><Text style={styles.textItem}>{contentItem.text}</Text></View>
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  return (
    <View style={styles.container}>
      
        {content}
        <View style={styles.buttonArea}><AddButton onPress={goToScheduling} width={Layout.window.width * 0.3}>Schedule</AddButton><AddButton width={Layout.window.width * 0.3}>Delete</AddButton><AddButton width={Layout.window.width * 0.3} onPress={goToEditing}>Edit</AddButton></View>
 
    </View>

  );
}

export default ContentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor:Colors.grey
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    marginVertical: 30
  },

  contentHolder: {
    //backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 8,
    width: Layout.window.width * 0.9,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',

  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Layout.window.height,
    width: Layout.window.width,
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  contentCards: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
    width: Layout.window.width * 0.9
  },
  cardRow: {
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  textItem: {
    backgroundColor: 'transparent',
    color: 'black',
    padding: 40,
    fontSize: 20,
    textAlign: 'center'

  },
  button: {
    backgroundColor: 'transparent',
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    color: 'black',
    margin:20


  },
  callIcons: {
    width:Layout.window.width*0.7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 30,
    paddingHorizontal:30
  },
  image: {
    width: Layout.window.width * 0.9,
    height: Layout.window.height * 0.4

  }
});


