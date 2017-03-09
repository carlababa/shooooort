import axios from 'axios';

export function updateUrlInput(url) {
  return {
    type: 'UPDATE_URL_INPUT',
    url,
  };
}

export function toggleIsLoading() {
  return {
    type: 'TOGGLE_IS_LOADING',
  };
}

export function shortenUrlRequestSuccess(response) {
  return {
    type: 'ADD_SHORTENED_LINK',
    shortcode: response.data.shortcode,
  };
}

export function resetUrlInput() {
  return {
    type: 'RESET_URL_INPUT',
  };
}

export function clearStorage() {
  return {
    type: 'CLEAR_STORAGE',
  };
}

export function getUrlStatsSuccess(response, shortcode) {
  return {
    type: 'ADD_STATS_TO_LINK',
    data: response.data,
    shortcode,
  };
}

export function getUrlStats(shortcode) {
  const urlApi = `/proxy/${shortcode}/stats`;
  return (dispatch) => {
    axios.get(urlApi)
      .then(response => dispatch(getUrlStatsSuccess(response, shortcode)))
      .catch((error) => {
        window.alert(error); // eslint-disable-line no-alert
      });
  };
}

export function shortenUrlRequest(url) {
  return (dispatch) => {
    dispatch(toggleIsLoading());
    axios.post('/proxy/shorten', { url })
      .then(response => dispatch(shortenUrlRequestSuccess(response)))
      .then(() => dispatch(toggleIsLoading()))
      .then(() => dispatch(resetUrlInput()))
      .catch((error) => {
        window.alert(error); // eslint-disable-line no-alert
      });
  };
}
