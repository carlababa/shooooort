function loadShortenedLinks() {
  try {
    const shortenedLinks = localStorage.getItem('shortenedLinks');
    if (shortenedLinks === null) {
      return undefined;
    }
    return JSON.parse(shortenedLinks);
  } catch (err) {
    return undefined;
  }
}

export default function initialState() {
  return {
    url: '',
    isLoading: false,
    shortenedLinks: loadShortenedLinks() || {},
  };
}
