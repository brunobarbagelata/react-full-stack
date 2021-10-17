import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Home(props) {
  const [example, setExample] = useState([]);
  let [name, setName] = useState("");
  let [age, setAge] = useState(0);

  useEffect(async () => {
    let res = await axios.get("http://localhost:5000/all");
    setExample(res.data);
    console.log(example);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await axios.post(`http://localhost:5000/newexample`, {
      name,
      age,
    });
  };
  const AllExamples = () => {
    return example.map((item) => {
      return (
        <div>
          <h3>
            {item.name}, {item.age}, {item._id}
          </h3>
        </div>
      );
    });
  };
  return (
    <div>
      {" "}
      <h1>app.js</h1>
      <AllExamples />
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setName(e.target.value)} placeholder="name" />
        <input onChange={(e) => setAge(e.target.value)} placeholder="age" />
        <button>Add example</button>
      </form>
    </div>
  );
}

export default Home;
