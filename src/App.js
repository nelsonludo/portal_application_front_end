import './css/App.css'
import SideBar from './components/sideBar.js';
import Sections from './components/Sections.js';
import AddSection from './components/addSectionPanel';
import AddApp from './components/addAppPanel';
import { useState } from 'react';

const initialAppList = [
  {
    title:"microsoftSuit",
    apps: [
      {
        image:"",
        title:"microsoftWindows"
      },
      {
        image:"",
        title:"microsoftExcel"
      },
      {
        image:"",
        title:"microsoftPowerPoint"
      }
    ]
  },
  {
    title:"Browsers",
    apps: [
      {
        image:"",
        title:"GoogleChrome"
      },
      {
        image:"",
        title:"Explorer"
      },
      {
        image:"",
        title:"Brave"
      },
    ]
  }
]

export default function App() {
  const [sectionList, setSectionList] = useState(initialAppList);
  const [isSectionAdd, setIsSectionAdd] = useState(false);
  const [isAppAdd, setIsAppAdd] = useState(false);



  function handleAddSectionClick(title) {
      setSectionList([
        ...sectionList,
        {
          title: title,
          apps: []
        }
      ]);

      setIsSectionAdd(false)
    }

  function handleAddAppClick(title, image, sectionTitle) {
      
      setSectionList(sectionList.map(section =>{
        if(section.title === sectionTitle){
          return {
          ...section,
          apps: [
            ...section.apps,
            {
              title:title,
              image:image
            }
          ]
        }} else{
          return section
        }
      }));

      setIsAppAdd(false)
    }

  return (
    <div className="App">
      {isSectionAdd && 
        <AddSection handleAddSectionClick={handleAddSectionClick}/>    
      }
      {isAppAdd && 
        <AddApp handleAddAppClick={handleAddAppClick} sectionList={sectionList}/>    
      }
      <SideBar sectionList={sectionList} setIsSectionAdd={setIsSectionAdd} setIsAppAdd={setIsAppAdd}/>
      <Sections sectionList={sectionList} setSectionList={setSectionList}/>
    </div>
  );
}




