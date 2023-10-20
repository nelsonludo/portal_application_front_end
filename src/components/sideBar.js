import React from 'react'
import '../css/sideBar.css'


export default function SideBar({sectionList, setIsSectionAdd, setIsAppAdd}){

    return(
        <div className="sideBarContainer">
            <div className='sideBarButtons'>
                <button className='myAppsBtn sideBarMainButtons'><span>My apps</span></button>
                {sectionList.map((section, index) => (
                        <button key={index} className='sectionButton sideBarMainButtons'><span>{section.title}</span></button>
                ))}
                <button className='sectionButton sideBarMainButtons' onClick={() => setIsSectionAdd(true)}><span>add section +</span></button>
                <button className='sideBarMainButtons'><span>Notifications</span></button>
                <button className='sideBarMainButtons' onClick={() => setIsAppAdd(true)}><span>add apps +</span></button>
            </div>
            <div className='sideBarFooter'>
                <span>Last sign in a few seconds ago</span>
                <span>CCOUSP Cameroon Yaounde</span>
                <span>Privacy</span>
            </div>
        </div>
    )
}

