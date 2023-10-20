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
        image:"/logo192.png",
        title:"microsoftWindows"
      },
      {
        image:"/logo192.png",
        title:"microsoftExcel"
      },
      {
        image:"/logo192.png",
        title:"microsoftPowerPoint"
      }
    ]
  },
  {
    title:"Browsers",
    apps: [
      {
        image:"/logo192.png",
        title:"GoogleChrome"
      },
      {
        image:"/logo192.png",
        title:"Explorer"
      },
      {
        image:"/logo192.png",
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
        <AddSection handleAddSectionClick={handleAddSectionClick} setIsSectionAdd={setIsSectionAdd}/>    
      }
      {isAppAdd && 
        <AddApp handleAddAppClick={handleAddAppClick} sectionList={sectionList} setIsAppAdd={setIsAppAdd}/>    
      }
        <div className="header">
          <div className='logoContainer'>
            <img src='/logo192.png' alt='ccousp logo' className='ccouspLogo'/>
            <h6>Ccousp & app name</h6>
          </div>
          <div className="searchBar">
              <img src="" alt="🔎"/>
              <input className="searchBarInput" placeholder="search you apps"/>
          </div>
        </div>
      <div className='appBodyContainer'>
        <SideBar sectionList={sectionList} setIsSectionAdd={setIsSectionAdd} setIsAppAdd={setIsAppAdd}/>
        <Sections sectionList={sectionList} setSectionList={setSectionList}/>
      </div>
    </div>
  );
}




