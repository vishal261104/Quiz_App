import React from "react";
const Result = (props) => {
  const highScore = props.score > 25;
  
  return (
    <div>
      {highScore && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`
            }}></div>
          ))}
        </div>
      )}
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
