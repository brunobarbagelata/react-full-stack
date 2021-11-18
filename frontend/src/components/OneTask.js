import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import taskpic from "./task.png";
import "../App.css";
import Button from "react-bootstrap/Button";

function OneTask(props) {
  const [example, setExample] = useState({});
  let [task, setTask] = useState("");
  let [description, setDescription] = useState("");
  let [showForm, setShowForm] = useState(false);

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

    let res = await axios.post(`http://localhost:5000/edittask`, editedTask);
    e.target.input2.value = "";
    e.target.input1.value = "";
    setShowForm(!showForm);
    setExample(res.data);
  };

  return (
    <div className="card1">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="bottom" src={taskpic} alt="imgincard" />
        <Card.Body>
          <Card.Title>{example.task}</Card.Title>
          <Card.Text>{example.description}</Card.Text>
        </Card.Body>
      </Card>
      <br />
      {!showForm ? (
        <Button onClick={() => setShowForm(!showForm)}>Edit</Button>
      ) : (
        <Button onClick={() => setShowForm(!showForm)}>Hide</Button>
      )}
      <br />
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <input
            id="input1"
            onChange={(e) => setTask(e.target.value)}
            placeholder="edit task"
            size="48"
          />
          <br />
          <textarea
            id="input2"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="edit description"
            rows="4"
            cols="50"
          />
          <br />
          <Button type="submit">Submit</Button>
        </form>
      ) : null}
    </div>
  );
}

export default OneTask;

function clean(obj) {
  for (var propName in obj) {
    // we creat a for loop with the variable propName. the for loop is looking for
    //if the propName is found in the obj. if found
    if (!obj[propName]) {
      // if the obj does not have the parameter.
      delete obj[propName];
      // delete the obj from the result
    }
  }
  return obj;
  // return remaining result
}
