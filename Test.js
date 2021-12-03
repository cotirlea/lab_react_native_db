import React,{useEffect,useState} from 'react'
import { Alert, StyleSheet, Text, View,Pressable, KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';


export default function Test() {

  const [{name},setName] = useState('');
  const [{year},setYear] = useState('');
  const [data,setData] = useState([]);
  const [load,setLoad] = useState(false);
  const [track,setTrack] = useState('');
  const db = SQLite.openDatabase('db.testDb');

  const handleName = e =>{
    setName({name:e})
  }

  const handleYear = e =>{
    setYear({year:e})
  }
  

  const add = () => {
    
     db.transaction(tx => {
      tx.executeSql('INSERT INTO lista (id_user, movie_name, movie_year, movie_genre, movie_score) values (?, ?, ?, ?, ?)', [1, 'john wick', 2014, 'action', 68] )
    })
    
    
    db.transaction(tx => {
      tx.executeSql('DROP TABLE vazut;')
    })
    
    Alert.alert('ok')
    
  }

   const shuffleBatch = (array) => {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };


  const show = () =>{
    
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM vazut;', [], (tx, results) => {
            const { rows } = results;
            let users = [];
            Alert.alert(String(rows.length))
            for (let i = 0; i < rows.length; i++) {
              users.push({
                ...rows.item(i),
              });
            }
            setData( arr => [ ...users]);
            Alert.alert(String(data.length))
      }) 
    })
  }

  const loadData = () =>{
    getData();
    setTimeout(() =>{
       setTrack('done')
    },1000)
  }

   useEffect(() => {
     db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS vazut (id INTEGER PRIMARY KEY, id_user INT, movie_name TEXT, movie_year INT, movie_genre TEXT, movie_score INT)'
      )
    })
   },[]);
   
    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       
           <View style={styles.container}>
              <View style={styles.title_container}>
                  <Text style={styles.text}>OK</Text>
              </View>
              <View style={styles.row_container}>          
                  <TextInput style={styles.input} keyboardType='text' placeholder="name" placeholderTextColor="#696969" onChangeText={handleName}/>                    
                  <TextInput style={styles.input} keyboardType='numeric' placeholder="year" placeholderTextColor="#696969" onChangeText={handleYear}/>
              </View>
              
              <Pressable style={styles.button} onPress={add}>
                <Text style={styles.text}>ADD</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={show}>
                <Text style={styles.text}>SHOW</Text>
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