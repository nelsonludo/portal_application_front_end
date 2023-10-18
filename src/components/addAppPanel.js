import React, {useState} from "react";

export default function AddApp({ handleAddAppClick, sectionList }) {
    const [title, setTitle] = useState('');
    const [sectionTitle, setSectionTitle] = useState(sectionList[0].title);
    const [image, setImage] = useState('');
    return (
      <>
        <select
          value={sectionTitle}
          onChange={e => setSectionTitle(e.target.value)}
        >
            {sectionList.map((section, index) => (
                <option key={index}>{section.title}</option>
            ))}
        </select>
        <input
          placeholder="enter app"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="enter app image url"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        <button onClick={() => {
          handleAddAppClick(title, image, sectionTitle);
        }}>Add</button>
      </>
    )
  }