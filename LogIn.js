import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { Button, Pressable , StyleSheet, Text, View,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';



export default function LogIn({navigation}) {

  const [load,setLoad] = useState(false);
  const [track,setTrack] = useState('');
  const db = SQLite.openDatabase('db.testDb');
  const [users,setUser] = useState([]);
  const [watchlist,setWatchlist] = useState([]);
  const [interacted,setInteracted] = useState([]);


  const [{userName},setUserName] = useState({username: null});
  const [{password},setPassword] = useState({password: null});

  const handleUsername = e =>{setUserName({userName:e})}
  const handlePassword = e =>{setPassword({password:e})}

  const getUser = () =>{
    for(let i = 0;i<users.length;i++){
      if(userName == users[i].username && password == users[i].password){return users[i];}
    }
    return '';
  }

  const getGenre = (user) =>{
    let genres = {'action':false,'drama':false, 'horror':false, 'comedy':false} 
    if(user.action == 1){
      genres.action = true
    }
    if(user.drama == 1){
      genres.drama = true
    }
    if(user.horror == 1){
      genres.horror = true
    }
    if(user.comedy == 1){
      genres.comedy = true
    }
    return genres
  }

  const prepare = () =>{
    let user = getUser()
    let genres = getGenre(user)
    const u = {id: user.id,username: user.username,password: user.password,score: user.score,min:user.min,max:user.max,genre:genres,watchlist:watchlist,interacted:interacted}
    navigation.replace('Main',u)
  }
  

  const LogIn = () =>{
    
    let erori = ''
    if(userName == null){erori = erori + 'username empty  \n'}
    if(password == null){erori = erori + 'password empty  \n'}

    if(erori == ''){
      let user = getUser()
      if(user == ''){
        Alert.alert('wrong credentials')
      }
      else{
        setLoad(false);
        setTrack('watchlist')     
      }
    }
    else{
      Alert.alert(erori)
    }
   
  }

  const getData = async () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users;', [], (tx, results) => {
            const { rows } = results;
            let data = [];
            for (let i = 0; i < rows.length; i++) {
              data.push({
                ...rows.item(i),
              });
            }
            
            setUser( arr => [ ...data]);
      }) 
    })
  }

  const getWatchlist = async () => {
    db.transaction(tx => {
      let user = getUser()
      tx.executeSql('SELECT id_user, movie_name, movie_year, movie_genre, movie_score FROM lista WHERE id_user = ? ;', [user.id], (tx, results) => {
            const { rows } = results;
            let data = [];
            Alert.alert(String(rows.length))
            for (let i = 0; i < rows.length; i++) {
              data.push({
                ...rows.item(i),
              });
            }
            setWatchlist( arr => [ ...data]);
      }) 
    })
  }

  const getInteracted = async () =>{
    db.transaction(tx => {
      let user = getUser()
      tx.executeSql('SELECT id_user, movie_name, movie_year, movie_genre, movie_score FROM vazut WHERE id_user = ? ;', [user.id], (tx, results) => {
            const { rows } = results;
            let data = [];
            
            for (let i = 0; i < rows.length; i++) {
              data.push({
                ...rows.item(i),
              });
            }
            setInteracted( arr => [ ...data]);
      }) 
    })
  }

  const loadData = () =>{
    getData();
    setTimeout(() =>{
       setTrack('done')
    },1000)
  }

  const loadWatchlist = () =>{
    getWatchlist();
    setTimeout(() =>{
       setTrack('interacted')
    },1000)
  }

  const loadInteracted = () =>{
    getInteracted();
    setTimeout(() =>{
       setTrack('passing')
    },1000)
  }


  useEffect(() => {
     if(track == 'done'){
        setLoad(true);
     }
     else if(track == 'watchlist'){
        loadWatchlist();
     }
     else if(track == 'interacted'){
       loadInteracted()
     }
     else if (track == 'passing'){
       prepare();
     }
     else{
       loadData();
     }
   },[track]);


  return (
    <View style={styles.container}>
      <View style={styles.title_container}>
          <Text style={styles.text}>{load == true  ? 'LOG IN' : 'loading'}</Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="username" placeholderTextColor="#696969" onChangeText={handleUsername}/>
                <TextInput style={styles.input} placeholder="password" placeholderTextColor="#696969" onChangeText={handlePassword}/>                    
            </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={LogIn}>
            <Text style={styles.text}>Log in</Text>
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
    flex:3,
    backgroundColor: '#202020',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    marginTop:10,
    fontSize: 30,
    color: "#FFF",
    borderWidth: 1,
    borderColor: "#FFF"
  },
  button:{    
    
    flex:1,
    backgroundColor:'#696969',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_input:{
    fontSize:30,
    color: "#FFF"
  },
  text:{
    fontSize:50,
    color: "#FFF"
  }
});
