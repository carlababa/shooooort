import React, { Component } from 'react';
import axios from 'axios';

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
    return (
      <div>
        <div className="link">
          <span>shooooort.com/{this.state.link.shortcode}</span>
          <br />
        </div>
        <span className="longUrl">{this.state.link.longUrl}</span>
        <div>
          <span>{this.state.link.redirectCount}</span>
          <span>{this.state.link.lastSeenDate}</span>
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
