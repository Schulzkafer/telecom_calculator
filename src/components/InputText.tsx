import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from 'react-native-paper';

interface Props {
   label: string,
   inputValue: string,
   setText: React.Dispatch<React.SetStateAction<string>>
   testID: string
}

const InputTextComponent: React.FC<Props> = ({ label, inputValue, setText, testID }) => {

   return (
      <TextInput
         label={label}
         placeholder={"Format 0##"}
         value={inputValue}
         onChangeText={(v: string) => setText(v)}
         maxLength={3}
         style={styles.input}
         autoComplete="off"
         testID={testID}
      />
   );
}

const styles = StyleSheet.create({
   input: {
      marginHorizontal: 12,
      marginVertical: 8,
   }

})

export default InputTextComponent;