import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';


export const fetchPostsAndUsers = () => async (dispatch, getState) => {
	await dispatch(fetchPosts());

	const userIds = _.uniq(_.map(getState().posts, 'userId'))

	userIds.forEach(id => dispatch(fetchUser(id)))

	//Alternative method to replicate above code using lodash
	//_.chain(getState().posts)
	//	.map('userId')
	//	.uniq()
	//	.forEach(id => dispatch(fetchUser(id)))
	//	.value();
};

export const fetchPosts = () => async dispatch => {

		const response = await jsonPlaceholder.get('/posts');

		dispatch(
			{
				type: 'FETCH_POSTS',
				payload: response.data
			})
};

export const fetchUser = id => async dispatch => {
		const response = await jsonPlaceholder.get(`/users/${id}`);

		dispatch({
			type: 'FETCH_USER',
			payload: response.data
		});
};


//**MEMOIZATION: good for static data**//
//makes API calls one time per unique value using memoization
//downside is if user with already called userId is updated, then it cannot be fetched again.
//export const fetchUser = id => dispatch => {
//	_fetchUser(id, dispatch);
//};

//const _fetchUser = _.memoize(async (id, dispatch) => {
//	const response = await jsonPlaceholder.get(`/users/${id}`);

//	dispatch({
//		type: 'FETCH_USER',
//		payload: response.data
//	});
//});

