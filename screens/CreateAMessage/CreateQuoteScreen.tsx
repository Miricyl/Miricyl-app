import * as React from 'react';
import { Platform, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Colors from '../../constants/Colors'
import { Text, View } from '../../components/Themed';
import { useState } from 'react';
import { CategoryType, ContentSelect, ContentType, IContentItem, CategoryProps, Schedule, Intervals, ScheduleMode, Weekday } from '../../types';
import { AddItem } from '../../storage/ContentStorage';
import AddButton from '../../components/AddButton'
import { useNavigation } from '@react-navigation/native';
import Layout from '../../constants/Layout';
import InputField from '../../components/InputField';
import { Entypo } from '@expo/vector-icons';
import HeaderMessage from '../../components/HeaderMessage';



export default function CreateQuoteScreen({ navigation, route }: CategoryProps) {
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
    const [contentType, setContentType] = useState(ContentType.Text);
    const [contentText, setContentText] = useState("");
    const [contentTitle, setContentTitle] = useState("");
    const [contentItem, setContentItem] = useState<IContentItem>(contentItemTemplate);
    const [selectButtonShow, setSelectButtonShow] = useState(true);



    const saveContentItem = async () => {

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

    const scheduleMessage = async () => {
        const id = await saveContentItem();
        nav.navigate('Scheduling', {
            contentId: id
        })

    }

    const setContentTextHandler = (text: string) => {
        setContentText(text);
        setSelectButtonShow(false);

    }
    {/* //TODO fix keyboard avoiding view */ }
    return (<KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === "ios" ? "padding" : "height"}
    ><TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* //TODO set the correct category for the header */}
            <View style={styles.transparent}>
                <HeaderMessage text="Category Type Message" />
                <View style={styles.container}>
                    <View style={styles.headerRow}><Entypo name="quote" size={24} color="black" /><Text style={{ padding: 20 }}>Type a quote</Text></View>
                    <InputField height={44} width={'90%'} lines={1} placeholder="Message Title" onChangeText={(title: string) => setContentTitle(title)} value={contentTitle} />
                    <InputField width={'90%'} height='40%' lines={6} placeholder="Type your quote here" onChangeText={(text: string) => setContentTextHandler(text)} value={contentText} />
                    <AddButton width={'90%'} borderWidth={1} borderColor={Colors.borderGrey} onPress={scheduleMessage}>Schedule</AddButton>
                    <AddButton width={'90%'} color={Colors.light.tint} onPress={saveContentItem}>Save</AddButton>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>


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
        height: 550,
        width: Layout.window.width * 0.9,
        margin: 10,
        marginTop: 30,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%'
    }

});