import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

function OneTask(props) {
  const [example, setExample] = useState({});
  let [task, setTask] = useState("");
  let [description, setDescription] = useState("");

  useEffect(async () => {
    let res = await axios.get(
      `http://localhost:5000/task?taskId=${props.match.params.exampleId}`
    );
    setExample(res.data);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let editedTask = clean({
      task: task,
      description: description,
      id: props.match.params.exampleId,
    });

    console.log(editedTask);

    let res = await axios.post(`http://localhost:5000/edittask`, editedTask);

    setExample(res.data);
  };

  return (
    <div>
      Details
      <h1>{example.task}</h1>
      <h3>{example.description}</h3>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTask(e.target.value)}
          placeholder="edit task"
          size="50"
        />
        <br />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="edit description"
          rows="4"
          cols="50"
        />
        <br />
        <button>Edit task</button>
      </form>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="bottom" src="../../public/task.png" />
        <Card.Body>
          <Card.Title>{example.task}</Card.Title>
          <Card.Text>{example.description}</Card.Text>
        </Card.Body>
      </Card>
      <img src="../../public/task.png" alt="img" />
    </div>
  );
}

export default OneTask;

function clean(obj) {
  for (var propName in obj) {
    // we creat a for loop with the variable propName. the for loop is looking for
    //if the propName is found in the obj. if found
    if (!obj[propName]) {
      // if the obj does not have the parameter
      delete obj[propName];
      // delete the obj from the result
    }
  }
  return obj;
  // return remaining result
}
