import React from 'react';
import { View, Text } from 'react-native';
import { navbarSyles } from '../styles/navbar';
import { COLORS } from "../constants/colors";

const Footer = () => {

   return (
      <View style={navbarSyles.view}>
         <Text style={{ color: COLORS.greenBlue, marginLeft: 12 }}>Developer: Aleksandr K.</Text>
      </View>
   )
}

export default Footer;