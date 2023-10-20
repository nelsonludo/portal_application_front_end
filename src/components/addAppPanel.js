import React, {useState} from "react";
import '../css/addPanel.css'


export default function AddApp({ handleAddAppClick, sectionList, setIsAppAdd }) {
    const [title, setTitle] = useState('');
    const [sectionTitle, setSectionTitle] = useState(sectionList[0].title);
    const [image, setImage] = useState('');
    
    return (
      <div className="mainAddContainer">
        <div className="addContainer">
          <h2>Add an Application</h2>
          <select
            value={sectionTitle}
            onChange={e => setSectionTitle(e.target.value)}
            className="sectionCombo"
          >
              {sectionList.map((section, index) => (
                  <option key={index}>{section.title}</option>
              ))}
          </select>
          <input
            placeholder="enter app"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="addInput"
          />
          <input
            placeholder="enter app image url"
            value={image}
            onChange={e => setImage(e.target.value)}
            className="addInput"
          />
          <button onClick={() => {
            handleAddAppClick(title, image, sectionTitle);
          }} className="addBtn">Add</button>
        </div>
        <div className="addContainerBackground" onClick={() => setIsAppAdd(false)}/>

      </div>
    )
  }