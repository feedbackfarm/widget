import React, { useState } from "react";
import "./App.css";

import { FeedbackFarm } from "@feedbackfarm/react";

function App() {
  const [test, setTest] = useState("");
  return (
    <div className="App">
      <FeedbackFarm projectId="123" identifier={test}>
        <button>Give Feedback</button>
      </FeedbackFarm>

      <button onClick={() => setTest(Math.random().toString())}>test</button>
      {test}
    </div>
  );
}

export default App;
