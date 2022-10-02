import React, { useState } from "react";
import "./App.css";

import { FeedbackFarm } from "@feedbackfarm/react";

function App() {
  const [identifier, setIdentifier] = useState("test");

  return (
    <div className="App">
      <FeedbackFarm projectId="123" identifier={identifier}>
        <button>Give Feedback</button>
      </FeedbackFarm>

      <button onClick={() => setIdentifier(`test2`)}>Change Identifier</button>
    </div>
  );
}

export default App;
