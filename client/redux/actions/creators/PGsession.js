import types from '../types';
import { post } from '../network';
import { handleError } from './utils';

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

/**
 * Schedules a session with the server. Doesn't indicate success or failure b/c why not.
 * @param {String} course the name of the course
 * @param {String} assignment the name of the assignment
 * @param {Date} time the start time, in Date object form
 * @param {Number} duration the duration in minutes
 */
export const scheduleSession = (course, assignment, time, duration) => async dispatch => {
  await post('/api/schedule/scheduleSession', {
    course: course,
    assignment: assignment,
    time: time,
    duration: duration
  });
}