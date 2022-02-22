import React from 'react';
import { StyleSheet, ScrollView, View, Platform, NativeModules } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Main from './src/pages/Main';
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import { COLORS } from "./src/constants/colors";

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 :
   Platform.OS === 'android' ? StatusBarManager.HEIGHT :
      0;//web

const App = () => {

   return (
      <SafeAreaProvider>
         <StatusBar style="auto" />
         <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
               <Header />
               <Main />
               <Footer />
            </ScrollView>
         </View>
      </SafeAreaProvider>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginTop: STATUSBAR_HEIGHT,
      backgroundColor: COLORS.greenBlue
   },
});

export default App;



