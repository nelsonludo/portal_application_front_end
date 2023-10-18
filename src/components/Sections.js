import React from "react";
import '../css/App.css'

export default function Sections({sectionList, setSectionList}){
   
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

    return(
        <div className="allSectionsContainer">
        {sectionList.map((section, index) => ( /**mapping through the sectionList array to access all the section objects which are elements in this array */
                <div key={index} className="singleSectionContainer">
                    <button>{section.title}</button>
                    <button onClick={() => {
                        setSectionList(sectionList.filter(f => f.title !== section.title));}}> {/**include every element in the new array created by the filter except the element with the same title */}
                        delete section
                    </button>
                    <AppSection sectionApps={section.apps} handleDeleteAppClick={handleDeleteAppClick}/>
                </div>
        ))}
        </div>
    )
}

function AppSection({sectionApps, handleDeleteAppClick}){
    return(
        sectionApps.map((app,index) => ( /** mapping through the single section apps array to get all apps in one section */
                <div key={index} className="app">
                    <button className="appOptionsButton" onClick={() => handleDeleteAppClick(app.title)}> {/**include every element in the new array created by the filter except the element with the same title */}
                        delete app -
                    </button>{/**this is temporarily the delete app button i shall add those in the "..." of the app button */}
                    <img className="appImage" src={app.image} alt="this is the app"/>
                    <p>{app.title}</p>
                </div>
        ))
    )
}