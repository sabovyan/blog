export const oneByOne = (interval, setDone, setInnerText, timerID, text) => {
  let i = 0;
  timerID = setInterval(() => {
    if (i === text.length - 1) {
      const backward = setInterval(() => {
        i--;
        if (i === 26) {
          clearInterval(backward);
          setTimeout(() => {
            setDone(true);
          }, interval + 100);
        }
        setInnerText(text.concat().slice(0, i));
      }, interval - 50);
      clearInterval(timerID);
    }
    setInnerText(text.concat().slice(0, i) + '|');

    i++;
  }, interval);
};
