import React, { Component } from 'react';
import axios from 'axios';
import Url from './Url';

require('./App.css');
require('./Grid.css');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      shortenedLinks: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.shortenUrl = this.shortenUrl.bind(this);
    this.addLink = this.addLink.bind(this);
  }

  handleChange(event) {
    this.setState({ url: event.target.value });
  }

  addLink(response) {
    this.setState({
      shortenedLinks: [
        ...this.state.shortenedLinks,
        {
          longUrl: this.state.url,
          shortcode: response.data.shortcode,
        },
      ],
      url: '',
    });
  }

  shortenUrl(event) {
    event.preventDefault();
    const urlApi = '/proxy/shorten';
    const url = this.state.url;

    axios.post(urlApi, { url })
      .then(this.addLink)
      .catch((error) => {
        window.alert(error); // eslint-disable-line no-alert
      });
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
              value={this.state.url} onChange={this.handleChange}
            />
            <button className="col-2-8" disabled={!this.state.url} type="submit">
              Shorten this link
            </button>
          </form>
        </div>
        <div className="previous">Previously shortened by you</div>
        <div className="grid header">
          <div className="link col-6-8">LINK</div>
          <div className="col-2-8 center">
            <div className="col-3-8">VISITS</div>
            <div className="col-5-8">LAST VISITED</div>
          </div>
        </div>
        {this.state.shortenedLinks.map(item => (
          <Url key={item.shortcode} link={item} />
        ))}
      </div>
    );
  }
}

export default App;
