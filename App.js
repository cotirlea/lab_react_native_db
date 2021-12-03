import * as React from 'react';
import Navigator from './HomeStack'
import {createStore} from 'redux';
import {Provider} from 'react-redux';


const initialState = {
  counter: 0
}

const reducer = (state = initialState) =>{
  return state;
}

const store = createStore(reducer)


export default function App(){
  return(
      <Provider store={store}>
        <Navigator 
          screenOptions={{
            headerShown: false
          }}
        />
      </Provider>
    
  );
}

