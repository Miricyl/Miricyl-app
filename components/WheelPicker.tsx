import * as React from 'react';
import { useState } from 'react';
import { View, Text } from 'react-native';
import Picker from '@gregfrench/react-native-wheel-picker'


var PickerItem = Picker.Item;

const WheelPicker = (props: { list: string[], selected: number, onSelect:any, width:number}) => {
  const [selected, setSelected] = useState(props.selected);
  const [itemList , setItemList ] = useState(props.list);

  return (
    <View>
        <Text>
        <Picker style={{width: props.width, height: 180}}
          lineColor="#000000" //to set top and bottom line color (Without gradients)
          lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
          lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
          selectedValue={selected}
          itemStyle={{color:"black", fontSize:26}}
          onValueChange={(index) => { setSelected(index); props.onSelect(index);} }>
          {itemList.map((value, i) => (
            <PickerItem label={value} value={i} key={i}/>
          ))}
        </Picker>
      </Text> 
    </View>
  );
};

export default WheelPicker;