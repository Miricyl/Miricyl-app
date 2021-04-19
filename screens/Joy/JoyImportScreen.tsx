import * as React from 'react';
import { Platform, StyleSheet, Image, TextInput, ImageBackground, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Colors from '../../constants/Colors'
import { Text, View } from '../../components/Themed';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { useState } from 'react';
import { CategoryType, ContentSelect, ContentType, IContentItem } from '../../types';
import { LoadJoyItems, AddJoyItem } from '../../storage/ContentStorage';
import AddButton from '../../components/AddButton'
import { useNavigation } from '@react-navigation/native';
import SelectWidget from '../../components/SelectWidget';
import Layout from '../../constants/Layout';
import InputField from '../../components/InputField';
import SelectButton from '../../components/SelectButton';



export default function JoyImportScreen() {
    let joyItemTemplate: IContentItem = {
        contentType: ContentType.Text,
        text: '',
        id: 'test',
        category: CategoryType.Joy
    }
    const navigation = useNavigation();
    const [contentType, setContentType] = useState(ContentType.Text);
    const [contentText, setContentText] = useState("");
    const [contentTitle, setContentTitle] = useState("");
    const [contentPhoneNumber, setContentPhoneNumber] = useState("");
    const [contentUrl, setContentUrl] = useState("");
    const [joyItem, setJoyItem] = useState<IContentItem>(joyItemTemplate);
    const [image, setImage] = useState("blank");
    const [selectButtonShow, setSelectButtonShow] = useState(true);

    let urlSelected = false;
    let imageSelected = false;
    let textSelected = false;
    let phoneSelected = false;

    const updateJoyItemText = (text: string) => {
        let joyItemNew = joyItem;
        joyItemNew.text = text;
        setJoyItem(joyItemNew);

    }

    const selectContent = (type: ContentType) => {
        setContentType(type);
    }

    const saveJoyItem = () => {

        let joyItemNew = joyItem;
        joyItemNew.title= contentTitle;
        joyItemNew.contentType = contentType;
        joyItemNew.text = contentText;
        joyItemNew.url = contentUrl;
        joyItemNew.phoneNumber = contentPhoneNumber;
        joyItemNew.category = CategoryType.Joy;
        joyItemNew.imageUri = image;

        AddJoyItem(joyItemNew).then(() => navigation.navigate('Joy'));

    }

    const setContentTextHandler = (text: string) => {
        setContentText(text);
        setSelectButtonShow(false);

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
            setImage(result.uri);
        }
    };

    const contentTypes: ContentSelect[] = [
        { label: "Text", value: ContentType.Text },
        { label: "Web link", value: ContentType.Url },
        { label: "Contact", value: ContentType.PhoneNumber },
        { label: "Photo", value: ContentType.Image }
    ]


    let controls;


    switch (contentType) {
        case ContentType.Text:
            textSelected = true;
            controls = <View style={styles.textAdd}>
                <InputField height='50%' lines={10} placeholder="Type your quote here" onChangeText={(text: string) => setContentTextHandler(text)} value={contentText} /></View>
            break;
        case ContentType.Image:
            imageSelected = true;
            controls = <View style={styles.textAdd}>
                <InputField height={44} lines={1} placeholder="Title" onChangeText={(title: string) => setContentTitle(title)} value={contentTitle} />
                <AddButton onPress={chooseImage}>Select photo</AddButton>   
                <Image source={{ uri: image }} style={styles.image} /></View>
            break;
        case ContentType.Url:
            urlSelected = true;
            controls = <View style={styles.textAdd}>
                <InputField height={60} lines={1} placeholder="Title" onChangeText={(title: string) => setContentTitle(title)} value={contentTitle} />
                <InputField height={60} lines={2} placeholder="Paste URL" onChangeText={(text: string) => setContentUrl(text)} value={contentUrl} />
            </View>
            break;
        case ContentType.PhoneNumber:
            phoneSelected = true;
            controls = <View style={styles.textAdd}>
                <InputField height={60} lines={1} placeholder="Title" onChangeText={(title: string) => setContentTitle(title)} value={contentTitle} />
                <InputField height={44} lines={1} placeholder="Number of someone to call" onChangeText={(text: string) => setContentPhoneNumber(text)} value={contentPhoneNumber} />
            </View>
            break;

        default: {
            break;
        }
    }

    let selectButtons = selectButtonShow ? (<View style={styles.selector}><Text style={styles.whiteText}>What would you like to add?</Text><SelectButton selected={urlSelected} onPress={() => { selectContent(ContentType.Url) }}>Save a video or url</SelectButton>
        <SelectButton selected={imageSelected} onPress={() => { selectContent(ContentType.Image) }}>Save an image</SelectButton>
        <SelectButton selected={phoneSelected} onPress={() => { selectContent(ContentType.PhoneNumber) }}>Add someone to contact</SelectButton>
        <SelectButton selected={textSelected} onPress={() => { selectContent(ContentType.Text) }}>Type a quote</SelectButton></View>) : null

    return (
        <ImageBackground source={require('../../assets/images/dashboard_background.png')} style={styles.background}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        {selectButtons}
                        <Text style={styles.whiteText}>Fill in the details</Text>
                        {controls}
                        <AddButton onPress={saveJoyItem}>Save</AddButton>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },

    background: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    selector: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        width: '80%',
        height: undefined,
        aspectRatio: 135 / 76,
        borderRadius: 5,
    },
    whiteText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        margin: 20
    },
    textAdd: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }


});