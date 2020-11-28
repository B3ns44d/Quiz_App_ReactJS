import React, { useState } from "react";
import QuestionCards from "./app/QuestionCards";
import { fetchQuizQuestions } from "./API";
import { QuestionsState, Difficulty } from "./API";
import { AppStyle, AppWrapper } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL__QUESTINS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // start the game
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL__QUESTINS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  // end of the start game function

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // get the user answer
      const answer = e.currentTarget.value;
      //  check the user answer against correct answer

      const correct = questions[number].correct_answer === answer;

      // add score if answer is correct

      if (correct) setScore((prev) => prev + 1);

      // Save Answer in the array for user answers

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // move on to the next question ...

    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL__QUESTINS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };
  return (
    <div className="app">
      <AppStyle />
      <AppWrapper>
        <main className="appMain">
          <span className="appspan"><p className="appP">Quiz App</p></span>
        </main>
        {gameOver || userAnswers.length === TOTAL__QUESTINS ? (
          <button className="start big-button" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className="score">Score🔺: {score} </p> : null}
        {loading ? <p>Loading Questions❓...</p> : null}
        {!loading && !gameOver && (
          <QuestionCards
            questionNr={number + 1}
            totalQuestions={TOTAL__QUESTINS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL__QUESTINS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </AppWrapper>
    </div>
  );
}

export default App;
