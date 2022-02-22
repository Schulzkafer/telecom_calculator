import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Checkbox } from 'react-native-paper';

import InputTextComponent from '../components/InputText';
import RadioButtonComponent from '../components/RadioButton';

import { MINUTES, PLAN, PRICETABLE } from "../constants/values";
import { COLORS } from "../constants/colors";

const Main = () => {

   const [originCode, setOriginCode] = useState<string>("");
   const [destinyCode, setDestinyCode] = useState<string>("");
   const [checkedMinutes, setCheckedMinutes] = useState<string>("20");
   const [withFaleMais, setWithFaleMais] = useState<boolean>(false);
   const [checkedPlan, setCheckedPlan] = useState<string>("30");
   const [totalSum, setTotalSum] = useState<string>("-");

   useEffect(() => {
      let price: number = PRICETABLE[`${originCode} ${destinyCode}`];
      if (price && originCode.length === 3 && destinyCode.length === 3) {
         let total = 0;
         if (withFaleMais) {
            let s: number = Math.max(0, +checkedMinutes - +checkedPlan) * price;
            total = s + s * 0.1;
         }
         else total = +checkedMinutes * price;
         setTotalSum(total.toFixed(2).toString())
      } else {
         setTotalSum("-")
      }

   }, [originCode,
      setOriginCode,
      destinyCode,
      setDestinyCode,
      checkedMinutes,
      setCheckedMinutes,
      withFaleMais,
      setWithFaleMais,
      checkedPlan,
      setCheckedPlan,
      totalSum,
      setTotalSum])

   return (

      <View style={[styles.view, styles.containerColumn]}>

         <View style={styles.containerColumn}>

            <InputTextComponent
               label="Origin"
               inputValue={originCode}
               setText={setOriginCode}
               testID="origin-input"
            />

            <InputTextComponent
               label="Destiny"
               inputValue={destinyCode}
               setText={setDestinyCode}
               testID="destiny-input"
            />

            <View style={[styles.containerRow, styles.note]}>
               <Text style={styles.label}>Choose the time in minutes:</Text>
               {
                  MINUTES.map(mins =>
                     <RadioButtonComponent
                        key={mins}
                        value={mins}
                        state={checkedMinutes}
                        setState={setCheckedMinutes}
                        forTest={"-minutes-"}
                     />)
               }
            </View>

            <View style={[styles.containerRow, styles.note]} >
               <Text
                  style={styles.label}
               >Do you want to use Fale Mais?</Text>
               <Checkbox
                  status={withFaleMais ? 'checked' : 'unchecked'}
                  onPress={() => {
                     setWithFaleMais(!withFaleMais);
                  }}
                  testID="checkbox-fale-mais"
               />
            </View >

            {withFaleMais ?
               <View style={[styles.containerRow, styles.note]} testID="chosing-plan-sector">
                  <Text style={styles.label}>Choose a plan of Fale Mais:</Text>
                  {
                     PLAN.map(p =>
                        <RadioButtonComponent
                           key={p} value={p}
                           state={checkedPlan}
                           setState={setCheckedPlan}
                           forTest={"-plan-"}
                        />)
                  }
               </View> :
               null
            }

            <View style={[styles.containerRow, styles.note]} >
               <Text style={styles.label}>Total sum:</Text>
               <Text testID="total-sum">{totalSum}</Text>
            </View >

            <View style={[styles.containerColumn, styles.note]} >
               <Text style={styles.noteText}>*Available codes:</Text>
               <Text style={styles.noteText}>011, 016, 017, 018</Text>
            </View >

         </View>
      </View>

   )
}

const styles = StyleSheet.create({
   view: {
      flex: 2,
      width: "100%",
      justifyContent: "center",
   },
   label: {
      marginRight: 12,
      fontSize: 16,
      color: COLORS.dimGray,
   },
   containerRow: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      borderBottomWidth: 2,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      borderColor: COLORS.darkGray,
   },
   containerColumn: {
      flexDirection: "column",
   },
   input: {
      width: "90%",
      margin: 12,
      borderWidth: 1,
      padding: 10,
   },
   note: {
      marginHorizontal: 12,
      marginVertical: 8,
      padding: 12,
      backgroundColor: COLORS.gray,
   },
   noteText: {
      fontSize: 10
   },
});

export default Main;