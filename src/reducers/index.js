const INITIAL_STATE = {
  url: '',
};

const shortApp = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_URL':
      return Object.assign({}, state, {
        url: action.url,
      });
    default:
      return state;
  }
};

export default shortApp;
