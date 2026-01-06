import React, {  useState,useEffect } from "react";
import QuestionCard from "./QuestionCard";
import Result from "./Result";

const Quiz = () => {
  const [isFinished, setIsFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastScore, setLastScore] = useState(null);
  const [bestScore, setBestScore] = useState(null);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=30&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const formattedQuestions = data.results.map((q) => {
          const options = [...q.incorrect_answers, q.correct_answer];

          // shuffle options
          options.sort(() => Math.random() - 0.5);

          return {
            question: decodeURIComponent(q.question),
            options,
            answer: q.correct_answer,
            explanation: "Explanation will be added later",
          };
        });

        setQuestions(formattedQuestions);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLastScore(localStorage.getItem("lastScore"));
    setBestScore(localStorage.getItem("bestScore"));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlwAnswer = (selectedOption) => {
    if (selectedOption === questions[currentIndex].answer) {
      setScore(score + 1);
    }
  };
  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setIsFinished(true);
    }
  };
  const [score, setScore] = useState(0);
  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
  };
  useEffect(() => {
    if (isFinished) {
      localStorage.setItem("lastScore", score);
      const storedBestScore = localStorage.getItem("bestScore");
      if (!storedBestScore || score > parseInt(storedBestScore)) {
        localStorage.setItem("bestScore", score);
      }
      setLastScore(score);
      setBestScore(
        Math.max(parseInt(localStorage.getItem("bestScore")) || 0, score)
      );
    }
  }, [isFinished,score]);

  // if (isFinished) {
  //   localStorage.setItem("lastScore", score);
  //   const storedBestScore = localStorage.getItem("bestScore");
  //   if (!storedBestScore || score > parseInt(storedBestScore)) {
  //     localStorage.setItem("bestScore", score);
  //   }
  //   setLastScore(score);
  //   setBestScore(
  //     Math.max(parseInt(localStorage.getItem("bestScore")) || 0, score)
  //   );
  // }
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
      {loading && <p>Loading questions...</p>}
      {!loading && (
        <>
          {isFinished ? (
            <Result
              questions={questions}
              score={score}
              resetQuiz={resetQuiz}
              lastScore={lastScore}
              bestScore={bestScore}
            />
          ) : (
            <QuestionCard
              questions={questions}
              handlwAnswer={handlwAnswer}
              currentIndex={currentIndex}
            />
          )}
        </>
      )}
      {!isFinished && !loading && (
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
