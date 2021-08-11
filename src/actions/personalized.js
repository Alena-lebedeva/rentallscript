import { SET_PERSONALIZED_VALUES } from '../constants';

export function setPersonalizedValues({ name, value }) {
  return {
    type: SET_PERSONALIZED_VALUES,
    payload: {
      name,
      value,
    },
  };
}
