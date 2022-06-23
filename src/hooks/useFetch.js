import { useState } from "react";

const useFetch = () => {
  const [answer, setAnswer] = useState(null);
  const [answerList, setAnswerList] = useState([]);
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
      setAnswerList(data.fiveLetterWords);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const generateNewAnswer = () => {
    let idx = Math.floor(Math.random() * answerList.length);
    let word = answerList[idx];
    setAnswer(word);
    setLoading(false);
  };

  return { answer, generateNewAnswer, loading, setLoading, error, fetchAnswer };
};

export default useFetch;
