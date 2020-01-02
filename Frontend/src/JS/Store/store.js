import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../Reducers/rootReducer';
const stateInitial ={
   
}
const middleware = [thunk];

export const store = createStore(
    rootReducer,
    stateInitial,
    compose(
        applyMiddleware(...middleware),
        /*window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/
    )
);
export default store;