import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { cutText, copyToClipboard } from './Helpers';

require('./Url.css');
require('./Grid.css');

class Url extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: this.props.link,
    };
  }

  componentDidMount() {
    const urlApi = `/proxy/${this.state.link.shortcode}/stats`;
    axios.get(urlApi)
      .then((response) => {
        this.setState({ link: Object.assign({}, this.state.link, response.data) });
      })
      .catch((error) => {
        window.alert(error); // eslint-disable-line no-alert
      });
  }

  render() {
    const longUrl = cutText(this.state.link.longUrl, 50);
    const fullLink = `http://gymia-shorty.herokuapp.com/${this.state.link.shortcode}`;
    return (
      <div className="grid row">
        <div className="col-5-8">
          <a className="link" onClick={() => copyToClipboard(fullLink)}>
            <span>shooooort.com/</span>
            <span className="shortcode">{this.state.link.shortcode}</span>
            <span className="copyLink">Click to copy this link</span>
          </a>
          <div className="longUrl">{longUrl}</div>
        </div>
        <div className="visits col-3-8 center">
          <div className="col-3-8">{this.state.link.redirectCount}</div>
          <div className="col-5-8">{moment(this.state.link.lastSeenDate).fromNow()}</div>
        </div>
      </div>
    );
  }
}

Url.defaultProps = {
  link: {},
};

Url.propTypes = {
  link: React.PropTypes.object,
};

export default Url;
