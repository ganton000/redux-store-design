import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import UsersReducer from './usersReducer';

export default combineReducers({
	posts: postsReducer,
	users: UsersReducer
});