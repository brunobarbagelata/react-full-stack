import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home(props) {
  const [taskList, setTaskList] = useState([]);
  let [task, setTask] = useState("");

  useEffect(async () => {
    let res = await axios.get("http://localhost:5000/alltasks");
    setTaskList(res.data);
    console.log(taskList);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await axios.post(`http://localhost:5000/newtask`, {
      name: task,
    });
    setTaskList([...taskList, ...[res.data]]);
  };
  const AllExamples = () => {
    return taskList.map((item) => {
      return (
        <div>
          <Link to={`/oneexample/${item._id}`}>
            <h3>{item.name}</h3>
          </Link>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      );
    });
  };
  return (
    <div>
      {" "}
      <h1>My tasks</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setTask(e.target.value)} placeholder="task" />
        <button>Add task</button>
      </form>
      <AllExamples />
    </div>
  );
}

export default Home;
