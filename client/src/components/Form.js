import React, { Component } from 'react';

const initialState = {
  fullURL: '',
  shortURL: '',
  error: ''
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  onURLChange = e => {
    this.setState({ fullURL: e.target.value, error: '' });
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
            <h2>
              Your shorten URL:{' '}
              <a href={this.state.shortURL} target="blank">
                {this.state.shortURL}
              </a>
            </h2>
            <br />
            <button onClick={() => this.setState(initialState)}>
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
