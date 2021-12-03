import React, { useState,useEffect } from 'react'
import { Pressable , StyleSheet, Text, View,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import CheckBox from 'react-native-check-box';
import Navigator from './HomeStack';
import * as SQLite from 'expo-sqlite';


export default function Update({navigation}) {
  const db = SQLite.openDatabase('db.testDb');
  const [username,setUsername] = useState('loading');
  const [password,setPassword] = useState('loading');
  const [score,setScore] = useState('loading');
  const [min,setMin] = useState('loading');
  const [max,setMax] = useState('loading');

  const [action,setAction] = useState(false);
  const [comedy,setComedy] = useState(false);
  const [drama,setDrama] = useState(false);
  const [horror,setHorror] = useState(false);
  const [load,setLoad] = useState(false);
  const [track,setTrack] = useState('');

  const [user,setUser] = useState({username: null,password:null,score:null,min:null,max:null,genre:null,watchlist:null,interacted:null});

  const handleUsername = e =>{setUsername(e)} 
  const handlePassword = e =>{setPassword(e)}
  const handleScore = e =>{setScore(e)}
  const handleMinYear = e =>{setMin(e)}
  const handleMaxYear = e =>{setMax(e)}

  const getChecked = () =>{
    if(action == true){return true;}
    if(drama == true){return true;}
    if(horror == true){return true;}
    if(comedy == true){return true;}
    return false;
  }

  const confirm = () =>{
    let erori = ''
    const checked = getChecked();
    if(username == null){erori = erori + 'username empty  \n'}
    if(password == null){erori = erori + 'password empty  \n'}
    if(score == null){erori = erori + 'score empty  \nand'}
    else{
      let x = Number(score)
      if(x<0) {erori = erori + 'score to low \n'}
      if(x>100) {erori = erori + 'score to high \n'}
    }
    if(min == null){erori = erori + 'minimum year empty  \n'}
    else{
      let x = Number(min)
      if(x<1899) {erori = erori + 'incorrect minimum year \n'}
    }
    if(max == null){erori = erori + 'maximum year empty  \n'}
     else{
      let x = Number(max)
      if(x>2021) {erori = erori + 'incorrect maximum year \n'}
    }
    if(checked.length == 0){
      erori = erori + 'no genre checked \n'
    }
    if(erori == ''){
      //const user = {username: userName,password: password,score: score,min:minYear,max:maxYear,genre:checked,watchlist:[],interacted:[]}
      let genres = {action: Number(action),drama: Number(drama), horror:Number(horror),comedy:Number(comedy)}
      user.username = username
      user.password = password
      user.score = score
      user.min = min
      user.max = max
      user.genre = genres
      setTrack('update')

    }
    else{
      Alert.alert(erori)
    }
  }

  const loadUser = () =>{
        setUser({
            id: navigation.getParam('id'),
            genre: navigation.getParam('genre'),
            watchlist: navigation.getParam('watchlist'),
            interacted: navigation.getParam('interacted'),
        })
        setUsername(navigation.getParam('username'))
        setPassword(navigation.getParam('password'))
        setScore(String(navigation.getParam('score')))
        setMax(String(navigation.getParam('max')))
        setMin(String(navigation.getParam('min')))

        setTimeout(() =>{
            setTrack('done')
        },1000)

  }

  const update = () =>{
    db.transaction(tx => {
      tx.executeSql('UPDATE users SET username = ?, password = ?, score = ?, min = ?, max = ?, action = ?, drama = ?, comedy = ?, horror = ? WHERE id = ?', [user.username, user.password, user.score, user.min, user.max, user.genre.action, user.genre.drama, user.genre.horror, user.genre.comedy, user.id],)
    })
    setTimeout(() =>{
            setTrack('update done')
    },2000)
  }


  useEffect(() => {
    if(track == 'done'){
      setAction(user.genre.action)
      setDrama(user.genre.drama)
      setHorror(user.genre.horror)
      setComedy(user.genre.comedy)
      setLoad(true);
    }
    else if(track == 'update'){
      update()
    }
    else if(track == 'update done'){
      navigation.replace('Main',user)
    }
    else{
      loadUser();
    }
  }, [track])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.title_container}>
                  <Text style={styles.text}>UPDATE</Text>
              </View>
              <View style={styles.container}>
                  <TextInput style={styles.input} placeholder="username" placeholderTextColor="#696969" onChangeText={handleUsername} value={username}/>
                  <TextInput style={styles.input} placeholder="password" placeholderTextColor="#696969" onChangeText={handlePassword} value={password}/>
                  <TextInput style={styles.input} keyboardType='numeric' placeholder="minimum score" placeholderTextColor="#696969" onChangeText={handleScore} value={score}/>     
              </View>
              <View style={styles.row_container}>          
                  <TextInput style={styles.input} keyboardType='numeric' placeholder="minimum year" placeholderTextColor="#696969" onChangeText={handleMinYear} value={min}/>                    
                  <TextInput style={styles.input} keyboardType='numeric' placeholder="maximum year" placeholderTextColor="#696969" onChangeText={handleMaxYear} value={max}/>
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
              <View style={styles.row_container}>
                    <Pressable style={styles.button} onPress={confirm}><Text style={styles.text}>CONFIRM</Text></Pressable>
              </View>
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
    flex:1,
    backgroundColor:'#696969',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
