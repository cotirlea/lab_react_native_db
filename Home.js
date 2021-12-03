import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable , StyleSheet, Text, View } from 'react-native';
import { Alert } from 'react-native';
import Navigator from './HomeStack';

export default function Home({navigation}) {
  const LogIn = () =>{
    navigation.replace('LogIn')
  }

  const SignIn = () =>{
    navigation.replace('SignIn')
  }


  return (
    <View style={styles.container}>
      <View style={styles.title_container}>
          <Text style={styles.text}>LAB MOBILE</Text>
      </View>
      <View style={styles.button_container}>
        <Pressable style={styles.button} onPress={LogIn}>
            <Text style={styles.text}>Log in</Text>
         </Pressable>
         <Pressable style={styles.button} onPress={SignIn}>
            <Text style={styles.text}>Sign in</Text>
         </Pressable>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },
  title_container: {
    flex:2,
    backgroundColor: '#202020',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_container: {
    flex:1,
    backgroundColor: '#202020',
  },
  button:{    
    marginBottom:10,
    marginTop:10,
    flex:1,
    backgroundColor:'#696969',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize:50,
    color: "#FFF"
  }
});