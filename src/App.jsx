import React, { Component, PropTypes } from 'react';
import NProgress from 'nprogress';
import { connect } from 'react-redux';
import { updateUrlInput, shortenUrlRequest, clearStorage } from './actions';
import Url from './Url';

require('nprogress/nprogress.css');
require('./App.css');
require('./Grid.css');

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.shortenUrl = this.shortenUrl.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
    localStorage.setItem('shortenedLinks', JSON.stringify(nextProps.shortenedLinks));
  }

  handleChange(event) {
    this.props.dispatch(updateUrlInput(event.target.value));
  }

  shortenUrl(event) {
    event.preventDefault();
    this.props.dispatch(shortenUrlRequest(this.props.url));
  }

  clearHistory() {
    localStorage.clear();
    this.props.dispatch(clearStorage());
  }

  renderList() {
    return (
      <div>
        <div className="previous">
          <span>Previously shortened by you</span>
          <a onClick={this.clearHistory} className="clearHistory">Clear history</a>
        </div>
        <div className="grid header">
          <div className="link col-5-8">LINK</div>
          <div className="col-3-8 center">
            <div className="col-3-8">VISITS</div>
            <div className="col-5-8">LAST VISITED</div>
          </div>
        </div>
        {Object.keys(this.props.shortenedLinks).map(item => (
          <Url key={item} {...this.props} {...this.props.shortenedLinks[item]} />
        ))}
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="grid">
          <div className="title col-4-8">Shooooort</div>
          <div className="subTitle col-4-8">The link shortener with a long name</div>
        </div>
        <div className="grid">
          <form className="formContainer" onSubmit={this.shortenUrl}>
            <input
              className="col-6-8"
              type="text"
              placeholder="Paste the link you want to shorten here"
              value={this.props.url} onChange={this.handleChange}
            />
            <button
              className="col-2-8"
              disabled={this.props.isLoading || !this.props.url}
              type="submit"
            >
              Shorten this link
            </button>
          </form>
        </div>
        {Object.keys(this.props.shortenedLinks).length ? this.renderList() : <div />}
      </div>
    );
  }
}

App.propTypes = {
  url: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  shortenedLinks: PropTypes.objectOf(PropTypes.shape({
    longUrl: PropTypes.string.isRequired,
    shortcode: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = state => (
  {
    url: state.url,
    isLoading: state.isLoading,
    shortenedLinks: state.shortenedLinks,
  }
);

export default connect(mapStateToProps)(App);
