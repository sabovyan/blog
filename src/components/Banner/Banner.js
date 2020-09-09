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
    const timer = setInterval(() => {
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
        clearInterval(timer);
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

  render() {
    const { innerText, done } = this.state;
    return (
      <div className="main__banner">
        <div className="banner__text">
          <pre className="text__type">{innerText}</pre>
          <h1 className="main__heading">{done ? 'Markdown!' : ''}</h1>
        </div>
        <Link hidden={this.props.hidden} className="login__link" to="/login">
          Let's go
        </Link>
      </div>
    );
  }
}
