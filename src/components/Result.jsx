import React from "react";
const Result = (props) => {
  return (
    <div>
      <h2>
        Your Score: {props.score} / {props.questions.length}
      </h2>
      <button onClick={props.resetQuiz}>Restart Quiz</button>
    </div>
  );
};
export default Result;
