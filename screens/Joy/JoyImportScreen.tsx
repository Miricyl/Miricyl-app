import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Colors from '../../constants/Colors'
import { Text, View } from '../../components/Themed';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { useState } from 'react';
import { ContentType, IJoyItem } from '../../types';
import { LoadJoyItems, AddJoyItems } from '../../storage/joyItemStorage';
import AddButton from '../../components/AddButton'
import { useNavigation } from '@react-navigation/native';

const radioButtonsData: RadioButtonProps[] = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Text',
    value: ContentType[ContentType.Text]
}, {
    id: '2',
    label: 'Link (Music, Video)',
    value: ContentType[ContentType.Url]
}, {
    id: '3',
    label: 'Image',
    value: ContentType[ContentType.Image]
}]




export default function JoyImportScreen() {
    let joyItemTemplate: IJoyItem = {
        type: ContentType.Text,
        text: ''
    }
    const navigation = useNavigation();
    const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>(radioButtonsData)
    const [joyItem, setJoyItem] = useState<IJoyItem>(joyItemTemplate)

    const onPressRadioButton = (radioButtonsArray: RadioButtonProps[]) => {
        setRadioButtons(radioButtonsArray);

    }
    const updateJoyItemText = (text: string) => {
        let joyItemNew=joyItem;
        joyItemNew.text=text;
        setJoyItem(joyItemNew);

    }

    const saveJoyItem = ()=>{
      
        let type:ContentType = ContentType.Text;
        const selected = radioButtons.find(item => item.selected);
        if(selected){
            type=ContentType[selected.value as keyof typeof ContentType]
        }

        let joyItemNew=joyItem;
        joyItemNew.type=type;
        
        AddJoyItems(joyItemNew).then(()=>navigation.navigate('Joy'));

    }

    return (
        <View style={styles.container}>
            <RadioGroup
                radioButtons={radioButtons}
                onPress={onPressRadioButton}
                layout='row'
            />
            <TextInput multiline={true} onChangeText={(value) => updateJoyItemText(value)} placeholder="Please enter something here"></TextInput>
            <AddButton onPress={saveJoyItem}>SAVE</AddButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});