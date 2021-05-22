import React, { useState } from 'react';
import { StyleSheet, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { IContentItem, ContentType, ScheduleMode } from '../types';
import Layout from '../constants/Layout';
import { Entypo, FontAwesome, FontAwesome5, } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { Linking } from 'react-native';
import sms from 'react-native-sms-linking';
import CloseButton from '../components/CloseButton';
import { DeleteItem, UpdateItem } from '../storage/ContentStorage';
import * as Notifications from 'expo-notifications';
import AddButton from './AddButton';


const ContentCard = (props: { item: IContentItem, onClose: any }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [contentItem, setContentItem] = useState<IContentItem>(props.item);
  const navigation = useNavigation();

  const goToContentScreen = () => {
    navigation.navigate('Content', {
      contentId: contentItem.id
    });
  }

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
  const popUpDelete = () => {
    setModalVisible(true);
  }

  const unscheduleItem = () => {

    if (contentItem.schedule.identifyer !== undefined) {
      cancelNotification(contentItem.schedule.identifyer).then();
    }

    let item = { ...contentItem };
    if (item.schedule) {
      item.schedule.identifyer = '';
      item.active = false;
    }
    setContentItem(item);
    UpdateItem(contentItem).then(() => {
      props.onClose();
    });;

  }

  const deleteItem = () => {
    if (contentItem.schedule.identifyer !== undefined) {
      //TODO extend this method so it checks for success and only then deletes item, if not successful ask user to try again
      cancelNotification(contentItem.schedule.identifyer).then(() => {
        DeleteItem(contentItem.id).then(() => {
          props.onClose();
        });
      });
    }
    else {
      DeleteItem(contentItem.id).then(() => {
        props.onClose();
      });
    }
  }

  const openSMS = () => {
    if (contentItem.phoneNumber) {
      contentItem.phoneNumber = contentItem.phoneNumber.replace(/[^0-9+]/g, '');
      sms(contentItem.phoneNumber, "").catch(console.error);
    }
  }

  /// TODO this function should be moved to a notification class to be used across all components
  const cancelNotification = async (id: string) => {
    await Notifications.cancelScheduledNotificationAsync(id);
  }

  let thumbnail;
  switch (contentItem.contentType) {
    case ContentType.PhoneNumber: {
      thumbnail = (
        <View style={styles.thumbnail}><Entypo name="phone" size={85} color={Colors.grey} /></View>)
      break;
    }
    case ContentType.Text: {
      thumbnail = (
        <View style={styles.thumbnail}><Entypo name="quote" size={85} color={Colors.grey} /></View>)
      break;
    }
    case ContentType.Url: {
      thumbnail = (
        <View style={styles.thumbnail}><FontAwesome name="video-camera" size={85} color={Colors.grey} /></View>)
      break;
    }
    case ContentType.Image: {
      thumbnail = (
        <View style={styles.thumbnail}><Image source={{ uri: contentItem.imageUri }} style={styles.image} /></View>)
      break;
    }
    default: {
      //statements; 
      break;
    }
  }
  let schedule;
  let unscheduleButton;
  if (contentItem.active && contentItem.schedule) {
    unscheduleButton = (<AddButton color={Colors.light.subtitle} onPress={() => { unscheduleItem(); setModalVisible(!modalVisible);}}><Text style={styles.textStyle}>Unschedule</Text></AddButton>)
    if (contentItem.schedule.scheduleMode == ScheduleMode.Scheduled) {
      schedule = contentItem.schedule.day + " " + contentItem.schedule.hour + ":" + contentItem.schedule.minute;
    }
    if (contentItem.schedule.scheduleMode == ScheduleMode.Interval) {
      schedule = "Every " + contentItem.schedule.deltaTime + " " + contentItem.schedule.frequency;
    }
  }


  return (

    <View style={styles.messageCard}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.rowView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>What would you like to do?</Text>
              <AddButton color={Colors.light.subtitle}
                onPress={() => {
                  deleteItem();
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Delete</Text>
              </AddButton>
              {unscheduleButton}
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
      <TouchableOpacity onPress={goToContentScreen}><View style={styles.content}>{thumbnail}
        <View style={styles.textContent}>
          <View><Text style={styles.title}>{contentItem.title}</Text></View>
          <View><Text style={styles.schedule}>{schedule}</Text></View>
        </View>
      </View></TouchableOpacity>
      <CloseButton onPress={popUpDelete} />

    </View>

  );
}

export default ContentCard;

const styles = StyleSheet.create({
  image: {
    width: 85,
    height: 85,
    borderRadius: 8


  },
  messageCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    width: Layout.window.width * 0.90,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',
    padding: 20

  },
  content: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  thumbnail: {
    marginRight: 20,
  },

  textContent: {
    justifyContent: 'space-between',
    width: 'auto',
  },

  cardText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  textItem: {
    color: Colors.light.text,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold'

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  schedule: {
    marginVertical: 10,
    fontSize: 14,
    color: Colors.light.subtitle,
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
  openButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    margin: 10
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
});
