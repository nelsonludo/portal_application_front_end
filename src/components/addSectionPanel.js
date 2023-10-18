import React, { useState } from "react";

export default function AddSection({ handleAddSectionClick }) {
    const [title, setTitle] = useState('');
    return (
      <>
        <input
          placeholder="Add section"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button onClick={() => {
          setTitle('');
          handleAddSectionClick(title);
        }}>Add</button>
      </>
    )
  }
