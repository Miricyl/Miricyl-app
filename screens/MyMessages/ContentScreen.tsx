import * as React from 'react';
import { Linking, ScrollView, Platform, Image, StyleSheet, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import { Text, View } from '../../components/Themed';
import Layout from '../../constants/Layout';
import { CategoryType, ContentType, IContentItem, ContentProps } from '../../types';
import { useEffect, useState } from 'react';
import { DeleteItem, LoadItem } from '../../services/ContentStorage';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import sms from 'react-native-sms-linking';
import AddButton from '../../components/AddButton';
import { useNavigation } from '@react-navigation/native';
import { CancelNotification } from '../../services/PushNotifications';
import * as WebBrowser from 'expo-web-browser';
import CloseButton from '../../components/CloseButton';

const ContentScreen = ({ navigation, route }: ContentProps) => {
  //content screen should allow you to schedule message and delete item.
  const { contentId } = route.params;
  const [contentItem, setContentItem] = useState<IContentItem>();
  const [modalVisible, setModalVisible] = useState(false);

  const nav = useNavigation();

  useEffect(() => {
    LoadItem(contentId).then((data) => setContentItem(data as IContentItem))
  }, []);


  const openPhone = () => {
    if (contentItem) {
      if (contentItem.phoneNumber) {
        contentItem.phoneNumber = contentItem.phoneNumber.replace(/[^0-9+]/g, '');
        let link;

        if (Platform.OS === 'ios') {
          //TODO not sure why either of these don't work
          //link = 'telprompt:${' + contentItem.phoneNumber + '}';
          link = 'tel:+' + contentItem.phoneNumber;
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
        category: contentItem.category,
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

  const deleteMessage = () => {
    if (contentItem) {
      if (contentItem.schedule.identifyer !== undefined) {
        //TODO extend this method so it checks for success and only then deletes item, if not successful ask user to try again
        CancelNotification(contentItem.schedule.identifyer).then(() => {
          DeleteItem(contentItem.id).then(() => {
            nav.navigate('MyMessages');
          });
        });
      }
      else {
        DeleteItem(contentItem.id).then(() => {
          nav.navigate('MyMessages')
        });
      }
    }
  }


  let content;
  if (contentItem) {
    let webview = contentItem.url ? contentItem.url : 'https://miricyl.org';
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
        let urlLink = contentItem.url ? <View style={styles.urlStyle}><TouchableOpacity onPress={() => { if (contentItem.url) { WebBrowser.openBrowserAsync(contentItem.url).then(() => { }) } }}><FontAwesome name="video-camera" size={55} color={Colors.light.subtitle} /><Text style={styles.urlText}>{contentItem.url}</Text></TouchableOpacity></View> : <></>;
        content = <View style={styles.contentContainer}><Text style={styles.title}>{contentItem.title}</Text><View style={styles.contentHolder}>{urlLink}</View></View>
        break;
      }
      case ContentType.Image: {
        let image = contentItem.imageUri !== '' ? <Image source={{ uri: contentItem.imageUri }} style={styles.image} /> : <></>;
        content = <View style={styles.contentContainer}><Text style={styles.title}>{contentItem.title}</Text><View style={styles.contentHolder}>{image}</View><Text style={styles.textItem}>{contentItem.text}</Text></View>
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
      <ScrollView>
        {content}
      </ScrollView>
      <View style={styles.buttonArea}>
        <AddButton onPress={goToScheduling} width={Layout.window.width * 0.3}>Schedule</AddButton>
        <AddButton onPress={()=>{setModalVisible(true)}} width={Layout.window.width * 0.3}>Delete</AddButton>
        <AddButton onPress={goToEditing} width={Layout.window.width * 0.3} >Edit</AddButton>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.rowView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure you want to delete this item?</Text>
              <AddButton color={Colors.light.subtitle}
                onPress={() => {
                  deleteMessage();
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Yes</Text>
              </AddButton>
              <AddButton
                color={Colors.grey}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={{ ...styles.textStyle, color: 'black' }}>Cancel</Text>
              </AddButton>
            </View>
            <CloseButton onPress={() => {
              setModalVisible(!modalVisible);
            }} />
          </View>
        </View>
      </Modal>

    </View >

  );
}

export default ContentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.grey
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    marginVertical: 30,

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
    padding: 20

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
    backgroundColor: 'transparent',
    paddingVertical: 30
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
    padding: 10,
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
    margin: 20
  },
  callIcons: {
    width: Layout.window.width * 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 30,
    paddingHorizontal: 30
  },
  urlStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20
  },
  urlText: {
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center'
  },
  image: {
    width: Layout.window.width * 0.9,
    height: Layout.window.height * 0.4

  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  centeredView: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 155,

  },
  modalView: {
    margin: 20,
    padding: 15,
    alignItems: 'center',

  },
  rowView: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 10
  },
});


