import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

interface Props {
   value: string,
   state: string,
   setState: React.Dispatch<React.SetStateAction<string>>,
   forTest: string
}

const RadioButtonComponent: React.FC<Props> = ({ value, state, setState, forTest }) => {

   return (
      <View style={styles.containerColumn} >
         <Text style={styles.toCenter}>{value}</Text>
         <RadioButton
            value={value}
            status={state === value ? 'checked' : 'unchecked'}
            onPress={() => setState(value)}
            testID={"radio" + forTest + value}
         >
         </RadioButton>
      </View >
   )
}

export default RadioButtonComponent;

const styles = StyleSheet.create({
   toCenter: {
      textAlign: "center",
   },
   containerColumn: {
      flexDirection: "column",
   }
})