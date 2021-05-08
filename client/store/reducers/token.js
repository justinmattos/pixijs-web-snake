export const SET_TOKEN = 'SET_TOKEN';

export const setToken = (token) => ({
  token,
  type: SET_TOKEN,
});

const initialState = '';

export default (state = initialState, action) => {
  const { type, token } = action;
  if (type === SET_TOKEN) return token;
  return state;
};
