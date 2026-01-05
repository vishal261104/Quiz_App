import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import Result from "./Result";
const Quiz = () => {
  const [isFinished, setIsFinished] = useState(false);
  const initialQuestions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
      explanation: "Paris is the capital and most populous city of France.",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
      explanation:
        "Mars is often called the 'Red Planet' because of its reddish appearance.",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean",
      ],
      answer: "Pacific Ocean",
      explanation: "The Pacific Ocean is the largest ocean on Earth.",
    },
  ];
  const [questions] = useState(() =>
    // Shuffle once per quiz so order stays stable while answering
    [...initialQuestions].sort(() => Math.random() - 0.5)
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlwAnswer = (selectedOption) => {
    if (selectedOption === questions[currentIndex].answer) {
      setScore(score + 1);
    }
    // const nextIndex = currentIndex + 1;
    // if (nextIndex < questions.length) {
    //   setCurrentIndex(nextIndex);
    // } else {
    //   setIsFinished(true);
    // }
  };
  const handleNext=()=>{
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setIsFinished(true);
    }
  }
  const [score, setScore] = useState(0);
  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div>
      <h1>Quiz App</h1>
      {!isFinished && (
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
      )}

      {isFinished ? (
        <Result questions={questions} score={score} resetQuiz={resetQuiz} />
      ) : (
        <QuestionCard
          questions={questions}
          handlwAnswer={handlwAnswer}
          currentIndex={currentIndex}
        />
      )}
      {!isFinished && (
        <div className="nav-row">
          <button className="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export default Quiz;
