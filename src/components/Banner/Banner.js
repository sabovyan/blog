import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Banner.css';

export default class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: `Customize your post \nwith \n# Markdown!  `,
      innerText: '',
      done: false,
    };
  }

  oneByOne = (interval) => {
    let i = 0;
    this.timerID = setInterval(() => {
      if (i === this.state.text.length - 1) {
        const backward = setInterval(() => {
          i--;
          if (i === 26) {
            clearInterval(backward);
            setTimeout(() => {
              this.setState({
                done: true,
              });
            }, interval + 100);
          }

          this.setState({
            innerText: this.state.text.concat().slice(0, i),
          });
        }, interval - 50);
        clearInterval(this.timerID);
      }
      this.setState({
        innerText: this.state.text.concat().slice(0, i) + '|',
      });

      i++;
    }, interval);
  };

  componentDidMount() {
    this.oneByOne(150);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { innerText, done } = this.state;
    return (
      <div className="main__banner">
        <div className="banner__text">
          <pre className="text__type">{innerText}</pre>
          <h1 className="main__heading">{done ? 'Markdown!' : ''}</h1>
        </div>
        <div className="banner__links">
          <Link
            hidden={this.props.hiddenLink}
            className="banner__link"
            to="/login"
          >
            Sign In
          </Link>
          <Link
            hidden={this.props.hiddenLink}
            className="banner__link"
            to="/signup"
          >
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
}
