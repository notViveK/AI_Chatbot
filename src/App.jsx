import { useState } from 'react'
import './App.css'
import { Configuration, OpenAIApi } from "openai";
import OptionSelection from './components/OptionSelection'
import Translation from './components/Translation'
import { arrayItems } from './AIOptions'
function App() {
  // console.log(arrayItems);
  const configuration = new Configuration({
    apiKey:import.meta.env.VITE_Open_AI_Key,
  });
  const openai = new OpenAIApi(configuration);
  const [option, setOption] = useState({});
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const selectOption = (option) => {
    setOption(option);
    // console.log(option);
  };
  const doStuff = async () => {
    setIsLoading(true);
    let object = { ...option, prompt: input };

    const response = await openai.createCompletion(object);
    console.log(response);
    // console.log(response.data.choices[0].text);
    setResult(response.data.choices[0].text);
    setIsLoading(false);
  };
  // console.log(input);
  return (
    <div className="App">
      {Object.values(option).length === 0 ? (<OptionSelection arrayItems={arrayItems}                selectOption={selectOption} />) : (<Translation doStuff={doStuff} setInput={setInput} result={result} isLoading={isLoading}/>)}
    </div>
  )
}

export default App
