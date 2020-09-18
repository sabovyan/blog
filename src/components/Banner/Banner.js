import React, { useEffect, useState } from 'react';
import { TEXT } from './constants/constants';
import { oneByOne } from './helper/function.helper';

import './Banner.css';

export default function Banner() {
  const [innerText, setInnerText] = useState('');
  const [done, setDone] = useState(false);

  let timerID = null;

  useEffect(() => {
    oneByOne(150, setDone, setInnerText, timerID, TEXT);
    return () => clearInterval(timerID);
  }, [timerID]);

  return (
    <div className="main__banner">
      <div className="banner__text">
        <pre className="text__type">{innerText}</pre>
        <h1 className="main__heading">{done ? 'Markdown!' : null}</h1>
      </div>
      <div className="banner__links">
        <a className="banner__link" href="/signin">
          Sign In
        </a>
        <a className="banner__link" href="/signup">
          Sign Up
        </a>
      </div>
    </div>
  );
}
