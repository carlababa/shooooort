import React, { Component } from 'react';
import axios from 'axios';
import Url from './Url';

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
      <div>
        <form onSubmit={this.shortenUrl}>
          <input
            type="text"
            placeholder="Paste the link you want to shorten here"
            value={this.state.url} onChange={this.handleChange}
          />
          <button type="submit">
            Shorten this link
          </button>
        </form>
        {this.state.shortenedLinks.map(item => (
          <Url key={item.shortcode} link={item} />
        ))}
      </div>
    );
  }
}

export default App;
