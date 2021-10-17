import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [example, setExample] = useState([]);

  useEffect(async () => {
    let res = await axios.get("http://localhost:5000/all");
    setExample(res.data);
    console.log(example);
  }, []);

  const AllExamples = () => {
    return example.map((item) => {
      return (
        <div>
          <h3>{item.name}</h3>
          <h4>{item.age}</h4>
          <h5>{item._id}</h5>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <h1>app.js</h1>
      <AllExamples />
    </div>
  );
}

export default App;
