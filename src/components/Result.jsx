import React from "react";
const Result = (props) => {
  return (
    <div>
      <h2>
        Your Score: {props.score} / {props.questions.length}
      </h2>
      <h2>
        your Last Score: {props.lastScore || 0} / {props.questions.length}
      </h2>
      <h2>
        Best Score: {props.bestScore || 0} / {props.questions.length}
      </h2>
      <button onClick={props.resetQuiz}>Restart Quiz</button>
    </div>
  );
};
export default Result;
