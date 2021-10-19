import axios from "axios";
import { useEffect, useState } from "react";

function OneTask(props) {
  const [example, setExample] = useState({});
  let [task, setTask] = useState("");

  useEffect(async () => {
    let res = await axios.get(
      `http://localhost:5000/task?taskId=${props.match.params.exampleId}`
    );
    setExample(res.data);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await axios.post(`http://localhost:5000/edittask`, {
      task: task,
      id: props.match.params.exampleId,
    });
    setExample(res.data);
  };

  return (
    <div>
      Details
      <h1>{example.task}</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTask(e.target.value)}
          placeholder="edit task"
        />
        <button>Edit task</button>
      </form>
    </div>
  );
}

export default OneTask;
