import React, { useState } from "react";

export default function Translation({ doStuff, setInput, result,isLoading }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [spokenInput, setSpokenInput] = useState("");

  const handleCopyClick = () => {
    navigator.clipboard.writeText(result);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };
  const handleSpeechRecognition = () => {
    console.log("started speech");
    const recognition = new window.webkitSpeechRecognition();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const capitalizedTranscript = transcript.charAt(0).toUpperCase() + transcript.slice(1);
      console.log(capitalizedTranscript);
      console.log("speech end");
      setSpokenInput(capitalizedTranscript);
      setInput(capitalizedTranscript);
    };
    recognition.start();
  };
  return (
    <div>
      <textarea
        className="text-area" cols={55} rows={10} value={spokenInput}
        onChange={(e) => {
          const typedText = e.target.value;
          setSpokenInput(typedText);
          setInput(typedText);
        }}
      ></textarea>
      <button className={`action-btn ${isLoading ? 'loading-spinner' : ''}`} onClick={doStuff}           disabled={isLoading}>{isLoading ? 'Loading...' : 'Submit'}
      </button>
      {isLoading ? (
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      ) : (
      <h3 className="result-text">{result.length > 0 ? result : ""}</h3>)}
      {result.length > 0 && (
        <div className="copy-button-container">
          <button
            className="copy-button"
            onClick={handleCopyClick}
            disabled={copySuccess}
          >
            {copySuccess ? "Copied!" : "Copy Response"}
          </button>
        </div>
      )}
      <div className="speech-recognition-container">
        <button
          className={`speech-recognition-button ${
            isListening ? "listening" : ""
          }`}
          onClick={handleSpeechRecognition}
        >
          {isListening ? "Listening..." : "Tap to Talk"}
        </button>
      </div>
    </div>
  );
}