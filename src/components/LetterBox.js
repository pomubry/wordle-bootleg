const IndivBox = ({ letter, answer, ans, boxNum, currentBox, isDone }) => {
  let match =
    letter === ans
      ? "isMatch"
      : answer.indexOf(letter) >= 0
      ? "isMisplaced"
      : "isWrong";

  return (
    <div className={`indiv-box ${(boxNum < currentBox || isDone) && match}`}>
      {letter}
    </div>
  );
};

export default IndivBox;
