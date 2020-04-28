import {combineReducers} from 'redux';
import StoreValue from './StoreValue';
import StoreId from './StoreId'
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig= {
    key:'root',
    storage:storage,
    whitelist:['storeValue','storeId']
}

const rootReducer=combineReducers({
    storeValue:StoreValue,
    storeId:StoreId
})

export default persistReducer(persistConfig,rootReducer);