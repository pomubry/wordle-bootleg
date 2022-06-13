import { useState } from "react";

const useFetch = () => {
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnswer = async () => {
    setLoading(true);
    try {
      let res = await fetch(
        "https://raw.githubusercontent.com/kashapov/react-testing-projects/master/random-word-server/five-letter-words.json"
      );

      if (!res.ok) {
        throw new Error(`This is an HTTP error: The status is ${res.status}`);
      }

      let data = await res.json();
      let idx = Math.floor(Math.random() * data.fiveLetterWords.length);
      let word = data.fiveLetterWords[idx];
      setAnswer(word);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { answer, loading, error, fetchAnswer };
};

export default useFetch;
