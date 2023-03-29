import React from 'react';
import { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import Logo from '../../assets/brain2.png';


const menuItems = [
    {
        name: "Dashboard",
        menuIcons : [{ icon: "bi bi-kanban" } ],
        subMenus:[
            {name: "Family", icon: "bi bi-people-fill", to:"/user/index/family"},
            {name: "Agenda", icon: "bi bi-card-checklist", to:"/user/index/agenda"},
            {name: "Reports", icon: "bi bi-file-earmark-bar-graph-fill", to:"/user/index/report"}
        ]
    },

    {
        name: "Apps",
        menuIcons : [{ icon: "bi bi-app" } ],
        subMenus:[
            {name: "Calendar", icon: "bi bi-calendar-date-fill", to:"/user/index/calendar"},
            {name: "Games", icon: "bi bi-controller", to:"/user/index/play"}
         ]
    },
];

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }


function Sidebar(props) {

    const [inactive, setInactive] = useState(false);
    const { height, width } = useWindowDimensions();

    // useEffect(() => {
    //     if(inactive){
    //         document.querySelectorAll(".sub-menu").forEach((el) => {
    //             el.classList.remove("active");
    //         })
    //     }
    // }, [inactive]);

    useEffect(() => {
        if(width < 900){
            document.querySelectorAll(".side-menu").forEach((el) => {
                el.classList.add("inactive");
            })
            document.querySelectorAll(".sub-menu").forEach((el) => {
                el.classList.add("active");
            })
        }else{
            document.querySelectorAll(".side-menu").forEach((el) => {
                el.classList.remove("inactive");
            })
        }
    }, [width]);


    return (

            <div className={`side-menu ${inactive ? "inactive" : "" }`}>
                <div className="top-section">
                    <a className="logo" href="/user/index">
                        <img src={Logo} alt="brainy_logo"/>
                    </a>
                    <div
                        onClick={() => setInactive(!inactive)}
                        className="toggle-btn"
                    >
                        <i className="bi bi-arrow-left-circle-fill"></i>
                    </div>
                </div>

                <div className="search-controll">
                    <i className="bi bi-search"></i>
                    <input type="text" placeholder="Type to search..." />
                </div>

                <div className="divider"></div>

                <div className="main-menu">
                    <div>
                        {menuItems.map((menuItem, index) => (
                            <MenuItem
                                key={index}
                                name={menuItem.name}
                                menuIcons={menuItem.menuIcons}
                                to={menuItem.to}
                                subMenus={menuItem.subMenus }
                                onClick={() => {
                                    if(inactive){
                                        setExpand(true);
                                    }
                                }}
                            />
                        ))}

                    </div>
                </div>

            </div>

    );
};

export default Sidebar;
