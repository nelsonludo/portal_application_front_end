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
            <img src='/cems_logo.png' alt='ccousp logo' className='ccouspLogo'/>
            <h6>Ccousp Portal App</h6>
          </div>
          <div className="searchBar">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
              </svg>
              <input className="searchBarInput" placeholder="search you apps"/>
          </div>
        </div>
      <div className='appBodyContainer'>
        <SideBar sectionList={sectionList} setIsSectionAdd={setIsSectionAdd} setIsAppAdd={setIsAppAdd}/>
        <Sections sectionList={sectionList} setSectionList={setSectionList} handleAddAppClick={handleAddAppClick}/>
      </div>
    </div>
  );
}




