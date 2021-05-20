import * as React from 'react';
import { Platform, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import Colors from '../../constants/Colors'
import { Text, View } from '../../components/Themed';
import { useState } from 'react';
import { CategoryType, ContentSelect, ContentType, IContentItem, CategoryProps, Schedule, Intervals, ScheduleMode, Weekday } from '../../types';
import { AddItem, LoadItem, UpdateItem } from '../../storage/ContentStorage';
import AddButton from '../../components/AddButton'
import { useNavigation } from '@react-navigation/native';
import Layout from '../../constants/Layout';
import InputField from '../../components/InputField';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import SelectButton from '../../components/SelectButton';
import * as ImagePicker from 'expo-image-picker';


export default function CreateMessageScreen({ navigation, route }: CategoryProps) {
    const { category } = route.params;
    const nav = useNavigation();
    let contentItemTemplate: IContentItem = {
        contentType: ContentType.Text,
        text: '',
        id: '',
        category: category,
        active: false,
        schedule: {
            identifyer: undefined,
            minute: '0',
            hour: '12',
            day: Weekday.Saturday,
            deltaTime: 2,
            frequency: Intervals.Days,
            scheduleMode: ScheduleMode.Interval,
        }

    }
    const [contentType, setContentType] = useState(ContentType.Url);
    const [contentText, setContentText] = useState("");
    const [contentTitle, setContentTitle] = useState("");
    const [contentImage, setContentImage] = useState("");
    const [contentPhoneNumber, setContentPhoneNumber] = useState("");
    const [contentUrl, setContentUrl] = useState("");
    const [contentItem, setContentItem] = useState<IContentItem>(contentItemTemplate);


    let urlSelected = false;
    let imageSelected = false;
    let textSelected = false;
    let phoneSelected = false;

    const selectContent = (type: ContentType) => {
        setContentType(type);
    }
    const saveContentItem = async () => {
        //TODO check that content has been added, if not prompt user to fill in fields      
        console.log(contentItem.id);
        if (contentItem.id!==undefined && contentItem.id!=="") {
            LoadItem(contentItem.id).then((item) => {
                if (item) {
                    item.contentType = contentType;
                    item.imageUri = contentImage;
                    item.phoneNumber = contentPhoneNumber;
                    item.text = contentText;
                    item.title = contentTitle;
                    console.log(item);
                    UpdateItem(item);
                }
            })
            return contentItem.id;
        }
        else {
            let itemNew = contentItem;
            itemNew.active = false;
            itemNew.title = contentTitle;
            itemNew.contentType = contentType;
            itemNew.text = contentText;
            itemNew.category = category;
            itemNew.schedule = {
                identifyer: "",
                scheduleMode: ScheduleMode.Scheduled,
                day: Weekday.Monday,
                hour: '20',
                minute: '00',
                frequency: Intervals.Weeks,
                deltaTime: 2
            }
            const id = await AddItem(itemNew);
            return id;
        }
    }

    const scheduleMessage = async () => {
        const id = await saveContentItem();
        nav.navigate('Scheduling', {
            contentId: id
        })

    }

    const chooseImage = async () => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
                else {
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                    await ImagePicker.requestCameraPermissionsAsync();
                }
            }
        })();


        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.cancelled) {
            setContentImage(result.uri);
        }
    };

    let controls;
    let imageControl;
    if (contentImage) {
        imageControl = <Image source={{ uri: contentImage }} style={styles.image} />
    }

    switch (contentType) {
        case ContentType.Text:
            textSelected = true;
            controls = (<><View style={styles.headerRow}><Entypo name="quote" size={24} color="black" /><Text style={styles.contentType}>Quote</Text></View>
                <InputField height={44} width={'90%'} lines={1} placeholder="Message Title" onChangeText={(title: string) => setContentTitle(title)} value={contentTitle} />
                <InputField height='40%' width={'90%'} lines={6} placeholder="Type any text here" onChangeText={(text: string) => setContentText(text)} value={contentText} /></>)
            break;
        case ContentType.Image:
            imageSelected = true;
            controls = <><View style={styles.headerRow}><FontAwesome name="camera" size={18} color="black" /><Text style={styles.contentType}>Photo</Text></View>
                <InputField height={44} width={'90%'} lines={1} placeholder="Message Title" onChangeText={(title: string) => setContentTitle(title)} value={contentTitle} />
                <View style={styles.imageRow}>
                    <SelectButton icon={<FontAwesome name="camera" size={24} color="black" />} selected={false} onPress={chooseImage} />
                    {imageControl}
                </View>
                <InputField height='30%' width={'90%'} lines={6} placeholder="Type description here" onChangeText={(text: string) => setContentText(text)} value={contentText} />
            </>
            break;
        case ContentType.Url:
            urlSelected = true;
            controls = (<><View style={styles.headerRow}><FontAwesome name="video-camera" size={24} color="black" /><Text style={styles.contentType}>Web-link</Text></View>
                <InputField height={44} width={'90%'} lines={1} placeholder="Message Title" onChangeText={(title: string) => setContentTitle(title)} value={contentTitle} />
                <InputField height={44} width={'90%'} lines={1} placeholder="Copy and paste a link" onChangeText={(text: string) => setContentUrl(text)} value={contentUrl} /></>)
            break;
        case ContentType.PhoneNumber:
            phoneSelected = true;
            controls = (<><View style={styles.headerRow}><Entypo name="phone" size={24} color="black" /><Text style={styles.contentType}>Phone number</Text></View>
                <InputField height={44} width={'90%'} lines={1} placeholder="Message Title" onChangeText={(title: string) => setContentTitle(title)} value={contentTitle} />
                <InputField height={44} width={'90%'} lines={1} placeholder="Type the number of someone to call" onChangeText={(text: string) => setContentPhoneNumber(text)} value={contentPhoneNumber} /></>)
            break;

        default: {
            break;
        }
    }
    {/* //TODO fix keyboard avoiding view and add scrollview */ }
    return (<ScrollView><KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === "ios" ? "padding" : "height"}
    ><TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.transparent}>
                <View style={styles.selector}>
                    <SelectButton icon={<FontAwesome name="video-camera" size={24} color="black" />} selected={urlSelected} onPress={() => { selectContent(ContentType.Url) }} />
                    <SelectButton icon={<FontAwesome name="camera" size={24} color="black" />} selected={imageSelected} onPress={() => { selectContent(ContentType.Image) }} />
                    <SelectButton icon={<Entypo name="phone" size={24} color="black" />} selected={phoneSelected} onPress={() => { selectContent(ContentType.PhoneNumber) }} />
                    <SelectButton icon={<Entypo name="quote" size={24} color="black" />} selected={textSelected} onPress={() => { selectContent(ContentType.Text) }} />
                </View>
                <View style={styles.container}>
                    {controls}
                    <AddButton width={'90%'} borderWidth={1} borderColor={Colors.borderGrey} onPress={scheduleMessage}>Schedule</AddButton>
                    <AddButton width={'90%'} color={Colors.light.tint} onPress={saveContentItem}>Save</AddButton>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView></ScrollView>


    );
}

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        backgroundColor: Colors.grey,
        paddingTop: 20

    },
    transparent: {
        backgroundColor: 'transparent',
    },
    container: {
        width: Layout.window.width * 0.9,
        margin: 10,
        marginTop: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%'
    },
    contentType: {
        padding: 20,
        color: Colors.light.subtitle,
        fontSize: 14,
        fontWeight: 'bold'

    },
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '95%',

    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },

});