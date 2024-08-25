import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

const App = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/bfhl",
        JSON.parse(input)
      );
      setResponse(res.data);
    } catch (error) {
      console.error("Error in submission: ", error);
      alert("Invalid JSON or server error.");
    }
  };

  const handleOptionChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div className="response-container">
        {selectedOptions.includes("Alphabets") && (
          <div>Alphabets: {response.alphabets.join(", ")}</div>
        )}
        {selectedOptions.includes("Numbers") && (
          <div>Numbers: {response.numbers.join(", ")}</div>
        )}
        {selectedOptions.includes("Highest lowercase alphabet") && (
          <div>
            Highest lowercase alphabet:{" "}
            {response.highest_lowercase_alphabet.join(", ")}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app-container">
      <h1>Your Roll Number</h1>
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Enter JSON here"
        className="json-input"
      ></textarea>
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>

      {response && (
        <div className="filter-container">
          <label>Filter Results:</label>
          <select
            multiple={true}
            value={selectedOptions}
            onChange={handleOptionChange}
            className="filter-select"
          >
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">
              Highest lowercase alphabet
            </option>
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default App;
