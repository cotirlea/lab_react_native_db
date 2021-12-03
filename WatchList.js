import React,{useState,useEffect} from 'react'
import { Alert } from 'react-native'
import { Pressable, StyleSheet, Text, View,ScrollView } from 'react-native'
import * as SQLite from 'expo-sqlite';



export default function WatchList({navigation}) {
    function ListItem({nume, an, gen, scor }){
        const get = () =>{
            for(let i=0;i<data.length;i++){
                if(data[i].movie_name == nume){
                    return i;
                }
            }
            return -1;
        }

        const remove = () =>{
            let k = get()
            
            
            db.transaction(tx => {
                tx.executeSql('DELETE FROM lista WHERE movie_name = ? ', [String(data[k].movie_name)],)
            })
            
            let x = []
            for(let i = 0;i<data.length;i++){
                if(i!=k){x.push(data[i])}
            }
            setData(arr => [ ...x]) 
        }
        return (
        <View style={styles.container}>
            <View style={styles.containerItem}>
                <Text style={styles.text}>{nume} </Text>
                <Text style={styles.text}>{an} </Text>
                <Text style={styles.text}>{gen} </Text>
                <Text style={styles.text}>{scor} </Text>
            </View>
             <Pressable style={styles.buttonItem} onPress={remove}>
                <Text style={styles.text}>Remove</Text>
            </Pressable>
        </View>
    )
    }
    const back = () =>{
        navigation.replace('Main',user)
    }
    const [user,setUser] = useState({id:null,username: null,password:null,score:null,min:null,max:null,genre:null,watchlist:null,interacted:null});
    const [load,setLoad] = useState(false);
    const [track,setTrack] = useState('');
    const [data,setData] = useState([])
    const db = SQLite.openDatabase('db.testDb');

    const getWatchlist = async () => {
        db.transaction(tx => {
        tx.executeSql('SELECT id_user, movie_name, movie_year, movie_genre, movie_score FROM lista WHERE id_user = ? ;', [user.id], (tx, results) => {
                const { rows } = results;
                let w = [];
                for (let i = 0; i < rows.length; i++) {
                w.push({
                    ...rows.item(i),
                });
                }
                setData( arr => [ ...w]);
        }) 
        })
    }
    const loadWatchlist = () =>{
        getWatchlist();
        setTimeout(() =>{
            setTrack('done')
        },1000)
    }
     const loadUser = () =>{
        setUser({
            id: navigation.getParam('id'),
            username: navigation.getParam('username'),
            password: navigation.getParam('password'),
            score: Number(navigation.getParam('score')),
            min: Number(navigation.getParam('min')),
            max: Number(navigation.getParam('max')),
            genre: navigation.getParam('genre'),
            watchlist: navigation.getParam('watchlist'),
            interacted: navigation.getParam('interacted'),
        })
        setTimeout(() =>{
            setTrack('get watchList')
        },1000)

    }
    useEffect(() => {
        if(track == 'done'){
            setLoad(true)
        }
        else if(track == 'get watchList'){
            loadWatchlist()
        }
        else{
            loadUser()
        }
    }, [track])
    return (

        <View style={styles.container}>
            <View style={styles.title_container}>
                <Text style={styles.title}>{load == false ? 'loading' : 'costi'}</Text>
            </View>
            <ScrollView style={styles.scroll} >
              {
                data.map(item => (
                <ListItem
                    nume={item.movie_name}
                    an={item.movie_year}
                    gen={item.movie_genre}
                    scor={item.movie_score}
                    />
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={back}>
                    <Text style={styles.text}>BACK</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title_container: {
        flex:1,
        backgroundColor: '#202020',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#202020',
        
    },
    scroll:{
        flex: 1,
        backgroundColor: '#202020',
    },
    containerItem: {
        flex: 1,
        backgroundColor: '#202020',
        
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer:{
        flex: 0.3,
        backgroundColor: '#202020',
    },
  
    
    text_input:{
        fontSize:30,
        color: "#FFF"
    },
    text:{
        fontSize:30,
        color: "#FFF"
    },
    title:{
        fontSize:70,
        color: "#FFF"
    },
    buttonItem:{    
        marginLeft:10,
        flex:1,
        backgroundColor:'#696969',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{    
        marginLeft:10,
        flex:1,
        backgroundColor:'#FF3131',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

