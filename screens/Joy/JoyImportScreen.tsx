import * as React from 'react';
import { Platform, StyleSheet, Image, TextInput, ImageBackground } from 'react-native';
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
//import WhiteLabel from '../../components/WhiteLabel';



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


    const updateJoyItemText = (text: string) => {
        let joyItemNew = joyItem;
        joyItemNew.text = text;
        setJoyItem(joyItemNew);

    }

    const saveJoyItem = () => {

        let joyItemNew = joyItem;
        joyItemNew.contentType = contentType;
        joyItemNew.text = contentText;
        joyItemNew.url = contentUrl;
        joyItemNew.phoneNumber = contentPhoneNumber;
        joyItemNew.category = CategoryType.Joy;
        joyItemNew.imageUri = image;

        AddJoyItem(joyItemNew).then(() => navigation.navigate('Joy'));

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

        console.log(result);

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

    const controls = 
       ( <View style={styles.controls}>
            <InputField lines={1} placeholder="Title" onChangeText={(title: string) => setContentTitle(title)} value={contentTitle} />
            <InputField lines={4} placeholder="Favourite Quote" onChangeText={(text: string) => setContentText(text)} value={contentText}/>
            <InputField lines={2} placeholder="Put web link to a favorite image/video/site here" onChangeText={(text: string) => setContentText(text)} value={contentUrl}/> 

            <InputField lines={1} placeholder="Number of someone to call" onChangeText={(text: string) => setContentPhoneNumber(text)} value={contentPhoneNumber} />
            <Image source={{ uri: image }} style={styles.image} />
            <AddButton onPress={chooseImage}>Select photo</AddButton>
        </View>)
    

    return (
       // <View style={styles.container}>

            <ImageBackground source={require('../../assets/images/dashboard_background.png')} style={styles.background}>
                {/* <WhiteLabel text="What would you like to add?"></WhiteLabel> */}
                <SelectWidget selectionItems={contentTypes} onSelect={setContentType} />
                {controls}
                <AddButton onPress={saveJoyItem}>SAVE</AddButton>
            </ImageBackground>
       // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Layout.window.height,
        width: Layout.window.width,
    },
    controls:{
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    image: {
        width: '80%',
        height: undefined,
        aspectRatio: 135 / 76,
        borderRadius: 5,
    }


});