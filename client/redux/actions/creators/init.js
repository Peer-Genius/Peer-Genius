// Mostly housekeeping actions that should be called upon initialization or login.
import cookies from 'js-cookie';
import { push } from 'react-router-redux';

import types from '../types';
import { get, post } from '../request';
import { handleError, handleStore } from './utils';

/**
 * Thunk action creator.
 * Called upon page load. Fetches communication methods, available subjects, and server configuration.
 */
export const initialize = () => async dispatch => {
	dispatch({ type: types.INIT_START });
	
	// Retrieve basic server information
	let [
		communicationMethodsResponse,
		subjectsResponse,
		configResponse
	] = await Promise.all([
		get('/loc/comms.json'),
		get('/loc/subjects.json'),
		get('/api/config')
	]);
	
	if (communicationMethodsResponse.ok && subjectsResponse.ok && configResponse.ok) {
		let communicationMethods = await communicationMethodsResponse.json();
		let flatSubjects = await subjectsResponse.json();
		let serverConfig = await configResponse.json();
		
		// Unflatten flatSubjects
		let subjects = {};
		for (let s in flatSubjects) {
			if (flatSubjects.hasOwnProperty(s)) {
				let [category, subject] = s.split(':', 2);
				if (!subjects[category]) {
					subjects[category] = {
						[subject]: flatSubjects[s]
					};
				}
				else {
					subjects[category][subject] = flatSubjects[s];
				}
			}
		}
		
		await dispatch({
			type: types.INIT_CONFIG,
			payload: {
				communicationMethods,
				subjects,
				serverConfig
			}
		});
	}
	
	// If logged in, retrieve user information
	if (cookies.get('sessionJWT')) {
		let response = await post('/api/account/info');
		
		if (response.ok) {
			// JWT still valid
			let json = await response.json();
			await dispatch(handleStore(json));
		}
		else {
			await dispatch(handleError(response));
		}
	}
	
	dispatch({ type: types.INIT_END });
};