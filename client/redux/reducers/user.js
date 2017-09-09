import deepmerge from 'deepmerge';

import types from '../actions/types';

const defaultState = {};

export default (state = defaultState, action) => {
  // eslint-disable-next-line
  let { type, payload, meta, error } = action;
  let diff = {};

  // Generally reducers will use `diff` to apply changes to state. Occassionally the reducer may return state directly to, for example, remove a certain attribute.
  switch (type) {
    default: {
      return state;
    }
    case types.INIT_USER: {
      diff = payload.user;
      break;
    }
    case types.CLEAR_USER: {
      return defaultState;
    }
    case types.EDIT_PROFILE: {
      diff = payload;
      break;
    }
  }

  return deepmerge(state, diff || {});
}
