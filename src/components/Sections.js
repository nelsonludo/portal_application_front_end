import React, { useState } from "react";
import '../css/sections.css'

export default function Sections({sectionList, setSectionList}){
    const [isActiveList, setIsActiveList] = useState(Array(sectionList.length).fill(false));

    function handleDeleteAppClick(appTitle){
        let newSectionList = sectionList.map(section => {
            let newApps = section.apps.filter(f => f.title !== appTitle) 
            return {
                ...section,
                apps: newApps
            }
        })
            setSectionList(newSectionList);
    }

    function toggleSection(index) {
        const newIsActiveList = [...isActiveList];
        newIsActiveList[index] = !newIsActiveList[index];
        setIsActiveList(newIsActiveList);
      }

    return(
        <div className="bodyContainer">
            <div className="allSectionsContainer">
            {sectionList.map((section, index) => ( /**mapping through the sectionList array to access all the section objects which are elements in this array */
                    <div key={index} className="singleSectionContainer">
                        <button className="sectionDropDownBtn" onClick={() => toggleSection(index)}><img src="" alt="^"/>{section.title}</button>
                        <button onClick={() => {
                            setSectionList(sectionList.filter(f => f.title !== section.title));}} className="appOptionsButton" > {/**include every element in the new array created by the filter except the element with the same title */}
                            🗑️
                        </button>
                        {isActiveList[index] && 
                            <AppSection sectionApps={section.apps} handleDeleteAppClick={handleDeleteAppClick}/>
                        }
                    </div>
            ))}
            </div>
        </div>
    )
}

function AppSection({sectionApps, handleDeleteAppClick}){
    return(
        <div className="singleSectionApps">
            {sectionApps.map((app,index) => ( /** mapping through the single section apps array to get all apps in one section */
                    <div key={index} className="app">
                        <button className="appOptionsButton" onClick={() => handleDeleteAppClick(app.title)}> {/**include every element in the new array created by the filter except the element with the same title */}
                        🗑️
                        </button>{/**this is temporarily the delete app button i shall add those in the "..." of the app button */}
                        <img className="appImage" src="/logo192.png"  alt="this is the app"/> {/*app.image*/}
                        <p>{app.title}</p>
                    </div>
            ))}
        </div>
    )
}