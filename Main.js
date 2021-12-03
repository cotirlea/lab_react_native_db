import React,{ useState,useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import Navigator from './HomeStack';
import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';


export default function Main({navigation}) {

    const [user,setUser] = useState({id:null,username: null,password:null,score:null,min:null,max:null,genre:null,watchlist:null,interacted:null});
    const [batch,setBatch] = useState([]);
    const [load,setLoad] = useState(false);
    const [track,setTrack] = useState('');
    const db = SQLite.openDatabase('db.testDb');

    const name = ()  =>{
        if(load == false){return 'loading'}
        else{
            if(batch.length == 0){return 'empty'}
            else{return batch[0].name}
        }
    }
    const year = ()  =>{
        if(load == false){return 'loading'}
        else{
            if(batch.length == 0){return 'empty'}
            else{return batch[0].year}
        }
    }
    const genre = ()  =>{
        if(load == false){return 'loading'}
        else{
            if(batch.length == 0){return 'empty'}
            else{return batch[0].genre}
        }
    }
    const score = ()  =>{
        if(load == false){return 'loading'}
        else{
            if(batch.length == 0){return 'empty'}
            else{return batch[0].score}
        }
    }

    const verificareGenre = (movie) =>{
        if(user.genre.action == true){
            if(movie.genre == 'action'){
                return true;
            }
        }
        if(user.genre.drama == true){
            if(movie.genre == 'drama'){
                return true;
            }
        }
        if(user.genre.horror == true){
            if(movie.genre == 'horror'){
                return true;
            }
        }
        if(user.genre.comedy == true){
            if(movie.genre == 'comedy'){
                return true;
            }
        }
        return false;
    }

    const add_watchList = (movie) =>{
         db.transaction(tx => {
            tx.executeSql('INSERT INTO lista (id_user, movie_name, movie_year, movie_genre, movie_score) values (?, ?, ?, ?, ?)', [user.id, movie.name, Number(movie.year), movie.genre, Number(movie.score)] )
        })
    }
    const add_Interact = (movie) =>{
         db.transaction(tx => {
            tx.executeSql('INSERT INTO vazut (id_user, movie_name, movie_year, movie_genre, movie_score) values (?, ?, ?, ?, ?)', [user.id, movie.name, Number(movie.year), movie.genre, Number(movie.score)] )
        })
    }

    const verificare = (movie) =>{
        if(Number(movie.score) < user.score){return false;}
        if(Number(movie.year) < user.min){return false;}
        if(Number(movie.year) > user.max ){return false;}
        if(verificareGenre(movie) == false){return false;}
        if(interacted(movie) == true){return false;}
        return true;
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

    const createBatch = (movies) =>{
        let batch = []
        for(let i=0;i<movies.length;i++){
            if(verificare(movies[i]) == true){
                batch.push(movies[i])
            }   
        }
        batch = shuffleBatch(batch)
        return batch
    }
    const update = () =>{
        navigation.replace('Update',user)
    }
    const interacted = (movie) => {
        for(let i =0;i<user.interacted.length;i++){
            if(movie.name == user.interacted[i].movie_name){
                return true;
            }
        }
        return false;
    }
    const watchlist = () =>{
        navigation.replace('WatchList',user)
    }
    const add = () =>{
        if(batch.length != 0){
            add_watchList(batch[0])
            user.interacted.push({id:user.id,movie_name:batch[0].name,movie_year: Number(batch[0].year),movie_genre:batch[0].genre,movie_score:Number(batch[0].score)})
            remove()
        }
    }
    const remove = () =>{
        if(batch.length !=0 ){
            let list = batch
            add_Interact(list[0])
            user.interacted.push({id:user.id,movie_name:list[0].name,movie_year: Number(list[0].year),movie_genre:list[0].genre,movie_score:Number(list[0].score)})
            list.splice(0,1)
            setBatch( arr => [ ...list]);
        }
    }
    const getData = async () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM movies;', [], (tx, results) => {
                const { rows } = results;
                let movies = [];
                for (let i = 0; i < rows.length; i++) {
                    movies.push({
                        ...rows.item(i),
                    });
                }
                movies = createBatch(movies)
                setBatch( arr => [ ...movies]);
            }) 
        })
    }

    const loadData = () =>{
        getData();
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
            setTrack('get movies')
        },1000)

    }
    

    useEffect(() => {
        if(track == 'done'){
            setLoad(true);
        }
        else if(track == 'get movies'){
            loadData();
        }
        else{
            loadUser();
        }
    }, [track])

    return (
        <View style={styles.container}>
            <View style={styles.button_container}>
                <Pressable style={Object.assign({ backgroundColor:'#4666FF' }, styles.button)} onPress={update}><Text style={styles.text}>UPDATE</Text></Pressable>
                <Pressable style={Object.assign({ backgroundColor:'#800080' }, styles.button)} onPress={watchlist}><Text style={styles.text}>LIST</Text></Pressable>
            </View>  
            <View style={styles.title_container}>
                <Text style={styles.text}>{name()}</Text>
                <Text style={styles.text}>{year()}</Text>
                <Text style={styles.text}>{genre()}</Text>
                <Text style={styles.text}>{score()}</Text>
            </View>
            <View style={styles.button_container}>
                <Pressable style={Object.assign({ backgroundColor:'#0FF240' }, styles.button)} onPress={add}><Text style={styles.text}>YES</Text></Pressable>
                <Pressable style={Object.assign({ backgroundColor:'#FF3131' }, styles.button)} onPress={remove}><Text style={styles.text}>NO</Text></Pressable>
            </View>  
        </View>
    )
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
    text:{
    fontSize:50,
        color: "#FFF"
    },
    button_container:{
        flex:0.5,
        flexDirection:'row'
    },
    button:{    
        
        flex:0.5,
        marginLeft:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
