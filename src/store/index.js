import {createStore, combineReducers, applyMiddleware, compose } from 'redux'; 
import cartReducer from './cart';
import produceReducer from './produce'; 

const rootReducer = combineReducers({ 
   produce: produceReducer, 
   cart: cartReducer
}); 

let enhancer; 

if (process.env.NODE_ENV !== 'production') { 
    const logger = require('redux-logger').default;
    const composeEnhancers = 
        typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) : compose; 
    
    // enhancer is set to the combined store enhancer
    enhancer = composeEnhancers(applyMiddleware(logger)); 
}

function configureStore(preloadedState) { 
    return createStore(rootReducer, preloadedState, enhancer);
}; 

export default configureStore; 
