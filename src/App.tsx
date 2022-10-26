import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

interface Result {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

interface ResponseData {
  response_code: number;
  results: Result[];
}

const App = () => {
  const [answer, setAnswer] = useState("");
  const [, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ResponseData>();

  // This function is called when the input changes
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredData = event.target.value;
    setAnswer(enteredData);
  };

  // This function is triggered when the Search buttion is clicked
  const checkAnswer = async () => {
    if (data?.results[0].correct_answer === answer) {
      setMessage("Right Answer");
      toast.success("Right Answer");
      setTimeout(() => {
        getQuestion();
      }, 1000);
    } else {
      setMessage("Wrong Answer");
      toast.error("Wrong Answer");
      setTimeout(() => {
        getQuestion();
      }, 5500);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    setLoading(true);
    const d = await fetch("https://opentdb.com/api.php?amount=1").then((res) =>
      res.json()
    );
    setData(d);
    setLoading(false);
  };

  return loading ? (
    <div className="app-loading">Loading</div>
  ) : (
    <div
      style={{
        height: "100vh",
        background:
          "radial-gradient(circle at 0% 0%, #373b52, #252736 51%, #1d1e26)",
      }}
    >
      <div className="container">
        {/* Display search result */}
        <div className="answer">
          <h1
            dangerouslySetInnerHTML={{
              __html: `${data?.results[0]?.question}`,
            }}
          />
        </div>

        <input
          value={answer}
          onChange={inputHandler}
          placeholder="Answer"
          className="input"
        />

        <button onClick={checkAnswer} className="myButton">
          Check
        </button>

        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
};

export default App;
