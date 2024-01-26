import React, { useState } from "react";
import "../css/addPanel.css";

export default function UpdateSection({
  setIsSectionUpdate,
  handleUpdateSectionClick,
  currentId,
  currentName,
}) {
  const [title, setTitle] = useState(currentName);
  const [emptyFieldErr, setEmptyFieldErr] = useState("");

  function handleEmptyFields() {
    setEmptyFieldErr("Please fill all the fields");
    setTimeout(() => {
      setEmptyFieldErr("");
    }, 2000);
  }

  return (
    <div className="mainAddContainer">
      <div className="addContainer">
        <h2>Update a section</h2>

        <input
          placeholder="Add section"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="addInput"
        />
        {title !== "" ? (
          <button
            onClick={() => {
              setTitle("");

              handleUpdateSectionClick(title, currentId);
            }}
            className="addBtn"
          >
            Update
          </button>
        ) : (
          <>
            <button onClick={handleEmptyFields} className="addBtn">
              Update
            </button>
            <p>{emptyFieldErr}</p>
          </>
        )}
      </div>
      <div
        className="addContainerBackground"
        onClick={() => setIsSectionUpdate(false)}
      />
    </div>
  );
}
