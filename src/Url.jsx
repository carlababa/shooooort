import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { cutText, copyToClipboard } from './Helpers';
import { getUrlStats } from './actions';

require('./Url.css');
require('./Grid.css');

class Url extends Component {
  componentDidMount() {
    this.props.dispatch(getUrlStats(this.props.shortcode));
  }

  render() {
    const longUrl = cutText(this.props.longUrl, 42);
    const fullLink = `http://gymia-shorty.herokuapp.com/${this.props.shortcode}`;
    return (
      <div className="grid row">
        <div className="col-5-8">
          <a className="link" onClick={() => copyToClipboard(fullLink)}>
            <span>shooooort.com/</span>
            <span className="shortcode">{this.props.shortcode}</span>
            <span className="copyLink">Click to copy this link</span>
          </a>
          <div className="longUrl">{longUrl}</div>
        </div>
        <div className="visits col-3-8 center">
          <div className="col-3-8">{this.props.redirectCount}</div>
          <div className="col-5-8">{moment(this.props.lastSeenDate).fromNow()}</div>
        </div>
      </div>
    );
  }
}

Url.propTypes = {
  dispatch: PropTypes.func.isRequired,
  shortcode: PropTypes.string.isRequired,
  longUrl: PropTypes.string.isRequired,
  redirectCount: PropTypes.number.isRequired,
  lastSeenDate: PropTypes.string.isRequired,
};

export default Url;
