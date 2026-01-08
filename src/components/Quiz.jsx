import React, { useState, useEffect } from "react";
import QuestionCard from "./QuestionCard";
import Result from "./Result";

const Quiz = () => {
  const [isFinished, setIsFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastScore, setLastScore] = useState(null);
  const [bestScore, setBestScore] = useState(null);
  const [started, setStarted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Helper function to decode HTML entities
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  // Fetch categories on mount
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.trivia_categories);
      });
  }, []);

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Fetch questions when quiz starts
  const startQuiz = () => {
    setStarted(true);
    setLoading(true);
    const categoryParam = selectedCategory
      ? `&category=${selectedCategory}`
      : "";
    fetch(`https://opentdb.com/api.php?amount=30&type=multiple${categoryParam}`)
      .then((res) => res.json())
      .then((data) => {
        const formattedQuestions = data.results.map((q) => {
          const options = [
            ...q.incorrect_answers.map((opt) => decodeHTML(opt)),
            decodeHTML(q.correct_answer),
          ];

          // shuffle options
          options.sort(() => Math.random() - 0.5);

          return {
            question: decodeHTML(q.question),
            options,
            answer: decodeHTML(q.correct_answer),
            explanation: "Explanation will be added later",
          };
        });

        setQuestions(formattedQuestions);
        setLoading(false);
      });
  };

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
    setStarted(false);
    setQuestions([]);
    setLoading(true);
    // setAnswers(Array(questions.length).fill(null));
  };
  useEffect(() => {
    if (isFinished) {
      // Get the CURRENT lastScore (which is the previous quiz's score)
      const previousLastScore = localStorage.getItem("lastScore");

      // Save current quiz score as the new lastScore
      localStorage.setItem("lastScore", score);

      // Update state to show the PREVIOUS score, not the current one
      setLastScore(previousLastScore);

      const storedBestScore = localStorage.getItem("bestScore");
      if (!storedBestScore || score > parseInt(storedBestScore)) {
        localStorage.setItem("bestScore", score);
      }
      setBestScore(
        Math.max(parseInt(localStorage.getItem("bestScore")) || 0, score)
      );
    }
  }, [isFinished, score]);

  return (
    <>
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      {!started && (
        <div className="quiz-container">
          <h1>Quiz App</h1>
          <p>Select a category and start the quiz</p>

          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button className="start-quiz-btn" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      )}

      {started && (
        <>
          <h1>Quiz App</h1>
          {!isFinished && questions.length > 0 && (
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
          {!loading && questions.length > 0 && (
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
        </>
      )}
      {started && !isFinished && !loading && (
        <div className="nav-row">
          <button className="next-btn" onClick={handleNext}>
            Next
          </button>
          <button className="submit-btn" onClick={() => setIsFinished(true)}>
            Submit Quiz
          </button>
        </div>
      )}
    </>
  );
};
export default Quiz;
