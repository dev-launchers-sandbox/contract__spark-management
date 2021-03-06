import React, { useState, useEffect } from "react";
import style from "./RandomQuote.module.css";
import quotes from "../../../data/Quotes/Quotes.json";

function RandomQuote() {
  const [randomQuote, setRandomQuote] = useState({});

  //Whenever this component mounts, we want to show a random quote!
  useEffect(() => {
    setRandomQuote(quotes[parseInt(quotes.length * Math.random(), 0)]);
  }, []);

  return (
    <div className={style.randomQuote}>
      <p>
        "{randomQuote.body}" - {randomQuote.author}
      </p>
    </div>
  );
}

export default RandomQuote;
