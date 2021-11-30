import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
//if i use storage is localStorage, if i import sessionstorage is sessionStorage
import storage from 'redux-persist/lib/storage';

import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import {searchReducer} from "./searchReducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] 
}
//can add reducers to persist in the array

const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
    search: searchReducer,
    
})

export default persistReducer(persistConfig, rootReducer)