import React, { useState, useEffect } from "react";

const QuestionCard = (props) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    setSelectedAnswer(null);
    setClicked(false);
  }, [props.currentIndex]);
  return (
    <div>
      <h2>{props.questions[props.currentIndex].question}</h2>
      <ol>
        {props.questions[props.currentIndex].options.map((option) => (
          <li key={option}>
            <button
              onClick={() => {
                setClicked(true);
                if (!selectedAnswer) {
                  setSelectedAnswer(option);
                  setTimeout(() => {
                    props.handlwAnswer(option);
                  }, 1000);
                }
              }}
              disabled={selectedAnswer !== null }
              className={
                selectedAnswer
                  ? option === props.questions[props.currentIndex].answer
                    ? "correct"
                    : option === selectedAnswer && option !== props.questions[props.currentIndex].answer
                    ? "wrong"
                    : ""
                  : ""
              }
            >
                {option}
            </button>
            
          </li>
        ))}
        <p >{ clicked && props.questions[props.currentIndex].explanation }</p>
      </ol>
    </div>
  );
};
export default QuestionCard;
