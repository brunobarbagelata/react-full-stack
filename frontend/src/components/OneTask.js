import axios from "axios";
import { useEffect, useState } from "react";

function OneTask(props) {
  const [example, setExample] = useState({});

  useEffect(async () => {
    let res = await axios.get(
      `http://localhost:5000/oneexample?exampleId=${props.match.params.exampleId}`
    );
    setExample(res.data);
  }, []);

  return (
    <div>
      Details
      <h1>{example.name}</h1>
      <h2>Age: {example.age}</h2>
    </div>
  );
}

export default OneTask;
