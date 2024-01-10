import React, { useState } from "react";
import "./App.css";
import { getInfo } from "./clientInstance";

function App() {
  const [items, setItems] = useState([]);

  const handleGetInfo = async () => {
    const fetchedInfo = await getInfo();
    setItems(fetchedInfo.data.amenityIndex.edges);
  };

  return (
    <div className="App">
      <button onClick={handleGetInfo}>Get Info</button>
      {items.map((item, index) => (
        <div key={index}>
          <p>Input: {index + 1}</p>
          <p>ID: {item.node.id}</p>
          <p>Location: {item.node.location}</p>
          <p>Type: {item.node.type}</p>
          <p>Operational Hours: {item.node.operationalHours}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
