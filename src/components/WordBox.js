import LetterBox from "./LetterBox";

const WordBox = ({ boxNum, word }) => {
  return (
    <>
      <div className={"grid word-box"}>
        {[0, 1, 2, 3, 4].map((idx) => (
          <LetterBox letter={word[idx]} boxNum={boxNum} key={idx} />
        ))}
      </div>
    </>
  );
};

export default WordBox;
