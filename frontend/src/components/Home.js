import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home(props) {
  const [taskList, setTaskList] = useState([]);
  let [task, setTask] = useState("");

  useEffect(async () => {
    let res = await axios.get("http://localhost:5000/all");
    setTaskList(res.data);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await axios.post(`http://localhost:5000/new`, {
      task: task,
    });
    setTaskList([...taskList, ...[res.data]]);
  };

  const deleteTask = async (id) => {
    console.log("working", id);
    let res = await axios.post(`http://localhost:5000/delete`, {
      id: id,
    });
    console.log(res.data);
    alert(`Task: ${res.data.task} has been deleted`);
    window.location.reload();
  };
  const AllExamples = () => {
    return taskList.map((item) => {
      return (
        <div>
          <Link to={`/task/${item._id}`}>
            <h3>{item.task}</h3>
          </Link>

          <button onClick={() => deleteTask(item._id)}>Delete</button>
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
