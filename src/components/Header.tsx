import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { COLORS } from "../constants/colors";

import { navbarSyles } from '../styles/navbar';


const Header = () => {

   return (
      <View style={navbarSyles.view}>
         <Image
            style={styles.stretch}
            source={require('../images/logo.png')}
         />
         <Text style={styles.slogan}>We’re the future of telecom</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   stretch: {
      width: 100,
      height: 36,
      resizeMode: 'stretch',
      marginLeft: 12
   },
   slogan: {
      marginLeft: 12,
      color: COLORS.greenBlue
   }
});

export default Header;