import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import articleReducer from './reducers/articleReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  articles: articleReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
