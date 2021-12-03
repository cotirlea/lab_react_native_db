import React, { useState } from 'react'
import { Pressable , StyleSheet, Text, View,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import CheckBox from 'react-native-check-box';
import Navigator from './HomeStack';



export default function SignIn({navigation}) {

  const [action,setAction] = useState(false);
  const [comedy,setComedy] = useState(false);
  const [drama,setDrama] = useState(false);
  const [horror,setHorror] = useState(false);
  const [{userName},setUserName] = useState({username: null});
  const [{password},setPassword] = useState({password: null});
  const [{confirmPassword},setConfirmPassword] = useState({confirmPassword: null});
  const [{score},setScore] = useState({score: null});
  const [{minYear},setMinYear] = useState({minYear: null});
  const [{maxYear},setMaxYear] = useState({maxYear: null});

  const handleUsername = e =>{setUserName({userName:e})}
  const handlePassword = e =>{setPassword({password:e})}
  const handleConfirmPassword = e =>{setConfirmPassword({confirmPassword:e})}
  const handleScore = e =>{setScore({score:e})}
  const handleMinYear = e =>{setMinYear({minYear:e})}
  const handleMaxYear = e =>{setMaxYear({maxYear:e})}

  const getChecked = () =>{
    const checked = []
    if(action == true){checked.push('action')}
    if(comedy == true){checked.push('comedy')}
    if(drama == true){checked.push('drama')}
    if(horror == true){checked.push('horror')}
    return checked;
  }

  const SignIn = () =>{
    let erori = ''
    const checked = getChecked();
    if(userName == null){erori = erori + 'username empty  \n'}
    if(password == null){erori = erori + 'password empty  \n'}
    if(confirmPassword == null){erori = erori + 'confirm password empty  \n'}
    if(score == null){erori = erori + 'score empty  \nand'}
    else{
      let x = Number(score)
      if(x<0) {erori = erori + 'score to low \n'}
      if(x>100) {erori = erori + 'score to high \n'}
    }
    if(minYear == null){erori = erori + 'minimum year empty  \n'}
    else{
      let x = Number(minYear)
      if(x<1899) {erori = erori + 'incorrect minimum year \n'}
    }
    if(maxYear == null){erori = erori + 'maximum year empty  \n'}
     else{
      let x = Number(maxYear)
      if(x>2021) {erori = erori + 'incorrect maximum year \n'}
    }
    if(password !=null && confirmPassword !=null){
          if(password != confirmPassword){
            erori = erori + 'confirm password not equal to password \n'
          }
    }
    if(checked.length == 0){
      erori = erori + 'no genre checked \n'
    }
    if(erori == ''){
      const user = {username: userName,password: password,score: score,min:minYear,max:maxYear,genre:checked,watchlist:[],interacted:[]}
      navigation.replace('Main',user)
    }
    else{
      Alert.alert(erori)
    }
  }
    return (  
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.title_container}>
                  <Text style={styles.text}>SIGN IN</Text>
              </View>
              <View style={styles.container}>
                  <TextInput style={styles.input} placeholder="username" placeholderTextColor="#696969" onChangeText={handleUsername}/>
                  <TextInput style={styles.input} placeholder="password" placeholderTextColor="#696969" onChangeText={handlePassword}/>
                  <TextInput style={styles.input} placeholder="confirm password" placeholderTextColor="#696969" onChangeText={handleConfirmPassword}/>                    
                  <TextInput style={styles.input} keyboardType='numeric' placeholder="minimum score" placeholderTextColor="#696969" onChangeText={handleScore}/>     
              </View>
              <View style={styles.row_container}>          
                  <TextInput style={styles.input} keyboardType='numeric' placeholder="minimum year" placeholderTextColor="#696969" onChangeText={handleMinYear}/>                    
                  <TextInput style={styles.input} keyboardType='numeric' placeholder="maximum year" placeholderTextColor="#696969" onChangeText={handleMaxYear}/>
              </View>
              <View style={styles.row_container}>          
                    <CheckBox style={{flex: 1, padding: 10}} checkBoxColor='#FFF' checkedCheckBoxColor='#FFF'  rightText={"action"} rightTextStyle={styles.label} isChecked={action}
                         onClick={()=>{setAction(!action)}}
                    />
                    <CheckBox style={{flex: 1, padding: 10}} checkBoxColor='#FFF' checkedCheckBoxColor='#FFF'  rightText={"comedy"} rightTextStyle={{fontSize:11,color: "#FFF"}} isChecked={comedy}
                        onClick={()=>{setComedy(!comedy)}}
                    />
                    <CheckBox style={{flex: 1, padding: 10}} checkBoxColor='#FFF' checkedCheckBoxColor='#FFF' rightText={"drama"} rightTextStyle={styles.label} isChecked={drama}
                        onClick={()=>{setDrama(!drama)}}
                    />
                    <CheckBox style={{flex: 1, padding: 10}} checkBoxColor='#FFF' checkedCheckBoxColor='#FFF' rightText={"horror"} rightTextStyle={styles.label} isChecked={horror}  
                        onClick={()=>{setHorror(!horror)}}
                    />

              </View>
              <Pressable style={styles.button} onPress={SignIn}>
                <Text style={styles.text}>CONFIRM</Text>
              </Pressable>
            </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>   
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
  },
  row_container:{
    flex: 0.3,
    backgroundColor: '#202020',
    justifyContent:'center',
    flexDirection:'row',
  },
  title_container: {
    flex:2,
    backgroundColor: '#202020',
    alignItems: 'center',
    justifyContent: 'center',
     alignSelf: 'stretch',
  },
  button_container:{
    flex:0.5,
    backgroundColor: '#202020',
  },
  text:{
    fontSize:50,
    color: "#FFF"
  },
  label:{
    fontSize:15,
    color: "#FFF"
  },
  input: {
    flex:1,
    height: 40,
    marginTop:10,
    fontSize: 20,
    color: "#FFF",
    borderWidth: 1,
    borderColor: "#FFF",
    width:'100%'
  },
  button:{    
    flex:0.5,
    backgroundColor:'#696969',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
