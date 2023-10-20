import React, { useState } from "react";
import '../css/addPanel.css'

export default function AddSection({ handleAddSectionClick, setIsSectionAdd}) {
    const [title, setTitle] = useState('');
    return (
      <div className="mainAddContainer">
        <div className="addContainer">
        <h2>Add a section</h2>

          <input
          placeholder="Add section"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="addInput"
        />
        <button onClick={() => {
          setTitle('');
          handleAddSectionClick(title);
        }} className="addBtn" >Add</button>
        </div>
        <div className="addContainerBackground" onClick={() => setIsSectionAdd(false)}/>

      </div>
    )
  }
