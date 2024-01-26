import React, { useState } from "react";
import "../css/addPanel.css";

export default function AddSection({
  handleAddSectionClick,
  setIsSectionAdd,
  toAdd,
  handleUpdateSectionClick,
}) {
  const [title, setTitle] = useState("");
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
        <h2>Add a section</h2>

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
              toAdd
                ? handleAddSectionClick(title)
                : handleUpdateSectionClick(title);
            }}
            className="addBtn"
          >
            Add
          </button>
        ) : (
          <>
            <button onClick={handleEmptyFields} className="addBtn">
              Add
            </button>
            <p>{emptyFieldErr}</p>
          </>
        )}
      </div>
      <div
        className="addContainerBackground"
        onClick={() => setIsSectionAdd(false)}
      />
    </div>
  );
}
