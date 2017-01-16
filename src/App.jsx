import React, { Component } from 'react';
import axios from 'axios';
import Url from './Url';

require('./App.css');
require('./Grid.css');

class App extends Component {
  constructor(props) {
    super(props);

    const shortenedLinks = localStorage.getItem('shortenedLinks') || '[]';
    this.state = {
      url: '',
      shortenedLinks: JSON.parse(shortenedLinks),
    };

    this.handleChange = this.handleChange.bind(this);
    this.shortenUrl = this.shortenUrl.bind(this);
    this.addLink = this.addLink.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
  }

  handleChange(event) {
    this.setState({ url: event.target.value });
  }

  addLink(response) {
    const shortenedLinks = [
      ...this.state.shortenedLinks,
      {
        longUrl: this.state.url,
        shortcode: response.data.shortcode,
      },
    ];
    localStorage.setItem('shortenedLinks', JSON.stringify(shortenedLinks));
    this.setState({
      shortenedLinks,
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

  clearHistory() {
    localStorage.clear();
    this.setState({
      shortenedLinks: [],
    });
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
        {this.state.shortenedLinks.map(item => (
          <Url key={item.shortcode} link={item} />
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
              value={this.state.url} onChange={this.handleChange}
            />
            <button className="col-2-8" disabled={!this.state.url} type="submit">
              Shorten this link
            </button>
          </form>
        </div>
        {this.state.shortenedLinks.length ? this.renderList() : <div />}
      </div>
    );
  }
}

export default App;
