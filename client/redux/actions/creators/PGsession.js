import types from '../types';
import { post } from '../request';
import { handleError, handleStore } from './utils';

import httpStatus from 'http-status-codes';

/* Holds action creators for functions related to handling of PeerGenius sessions.
*/


export const getPastSessions = () => async dispatch => {
	let response = await post('/api/schedule/getPastSessions');
	
	if (response.ok) {
		let pastSessions = await response.json();
		
		dispatch({
			type: types.INIT_PAST_SESSIONS,
			payload: { pastSessions }
		});
	} else {
		dispatch(handleError(response));
	}
};