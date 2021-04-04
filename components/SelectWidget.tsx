import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
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
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});