import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Colors from '../../constants/Colors'
import { Text, View } from '../../components/Themed';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { useState } from 'react';
import { CategoryType, ContentSelect, ContentType, IContentItem } from '../../types';
import { LoadJoyItems, AddJoyItem } from '../../storage/ContentStorage';
import AddButton from '../../components/AddButton'
import { useNavigation } from '@react-navigation/native';
import SelectWidget from '../../components/SelectWidget'


export default function JoyImportScreen() {
    let joyItemTemplate: IContentItem = {
        contentType: ContentType.Text,
        text: '',
        id:'test',
        category:CategoryType.Joy
    }
    const navigation = useNavigation();
    const [contentType, setContentType] = useState(ContentType.Text);
    const [joyItem, setJoyItem] = useState<IContentItem>(joyItemTemplate)

  
    const updateJoyItemText = (text: string) => {
        let joyItemNew=joyItem;
        joyItemNew.text=text;
        setJoyItem(joyItemNew);

    }

    const saveJoyItem = ()=>{
      
        let joyItemNew=joyItem;
        joyItemNew.contentType=contentType;
        joyItemNew.text="test1";
        joyItemNew.category=CategoryType.Joy;
        
        AddJoyItem(joyItemNew).then(()=>navigation.navigate('Joy'));

    }

    const contentTypes:ContentSelect[]=[
        { label: "Text", value: ContentType.Text},
        { label: "Web link", value: ContentType.Url },
        { label: "Contact", value: ContentType.PhoneNumber }
    ]

    return (
        <View style={styles.container}>
           <SelectWidget selectionItems={contentTypes} onSelect={setContentType}/>
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
    

});