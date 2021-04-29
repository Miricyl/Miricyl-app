import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import Colors from '../constants/Colors';
import {ContentSelect} from "../types";


const SelectWidget = (props:any) => {
return (
<RNPickerSelect style={styles} placeholder={{ label: "Select:", value: null }}
useNativeAndroidPickerStyle={false}
onValueChange={(value) => {props.onSelect(value)}}
items={props.selectionItems}/>)
}

export default SelectWidget;

const styles=StyleSheet.create({
inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: Colors.brown,
    backgroundColor: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    color: Colors.brown,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});