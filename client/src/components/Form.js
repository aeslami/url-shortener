import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullURL: '',
      shortURL: '',
      error: ''
    };
  }

  initialState = {
    fullURL: '',
    shortURL: '',
    error: ''
  };

  onURLChange = e => {
    this.setState({ fullURL: e.target.value });
  };

  onFormSubmit = async e => {
    e.preventDefault();
    try {
      const fullURL = new URL(this.state.fullURL);
      const response = await fetch('/add', {
        method: 'POST',
        body: JSON.stringify({ fullURL: fullURL.href }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(response.status); // 404
      }
      const jsonResponse = await response.json();
      this.setState({ shortURL: jsonResponse.shortURL });
    } catch (error) {
      this.setState({ error: 'Error occurred' });
    }
  };

  render() {
    return (
      <div>
        {this.state.shortURL.length == 0 && (
          <form onSubmit={this.onFormSubmit}>
            <input
              type="url"
              placeholder="Enter URL Here"
              value={this.state.fullURL}
              onChange={this.onURLChange}
            />
            <button>Submit</button>
          </form>
        )}
        {this.state.shortURL.length > 0 && this.state.error.length == 0 && (
          <div>
            <h2>{this.state.shortURL}</h2>
            <br />
            <button onClick={() => this.setState(this.initialState)}>
              Shorten another link
            </button>
          </div>
        )}
        {this.state.error.length > 0 && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default Form;
