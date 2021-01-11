import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// windows local storage
import storage from 'redux-persist/lib/storage';
// windows session storage (check docs for correct library)
//import sessionStorage from 'redux-persist/lib/???';


import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] // list of reducers you want to persist
}

// export default combineReducers( {
//     user: userReducer,
//     cart: cartReducer
// });

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);

