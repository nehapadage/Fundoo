import {reducer} from '../Reducer/Reducer'

import {createStore} from 'redux'


export default createStore(reducer)
// console.log("Initial State: ",store.getState());
// // store.subscribe(()=>console.log("Updated state",store.getState()))
// store.dispatch()