const shortApp = (state, action) => {
  switch (action.type) {
    case 'UPDATE_URL_INPUT':
      return Object.assign({}, state, {
        url: action.url,
      });
    case 'TOGGLE_IS_LOADING':
      return Object.assign({}, state, {
        isLoading: !state.isLoading,
      });
    case 'ADD_SHORTENED_LINK':
      return Object.assign({}, state, {
        shortenedLinks: Object.assign({}, state.shortenedLinks, {
          [action.shortcode]: {
            longUrl: state.url,
            shortcode: action.shortcode,
          },
        }),
      });
    case 'ADD_STATS_TO_LINK':
      return Object.assign({}, state, {
        shortenedLinks: Object.assign({}, state.shortenedLinks, {
          [action.shortcode]: Object.assign({}, state.shortenedLinks[action.shortcode], {
            redirectCount: action.data.redirectCount,
            lastSeenDate: action.data.lastSeenDate,
          }),
        }),
      });
    case 'RESET_URL_INPUT':
      return Object.assign({}, state, {
        url: '',
      });
    case 'CLEAR_STORAGE':
      return Object.assign({}, state, {
        shortenedLinks: [],
      });
    default:
      return state;
  }
};

export default shortApp;
