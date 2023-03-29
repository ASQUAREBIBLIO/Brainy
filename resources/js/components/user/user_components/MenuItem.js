import React from 'react';
import { useState } from 'react';



const MenuItem = (props) => {

    const { name, menuIcons, subMenus, onClick } = props;
    const [expand, setExpand] = useState(false);

    return(
        <li onClick={props.onClick}>
            <a onClick={()=>setExpand(!expand)} className="menu-item">
                <div className="menu-icon">
                    { menuIcons.map((menu) => (
                        <i className={menu.icon}></i>
                    ))}
                </div>
                <span>{name}</span>
            </a>

            {
                subMenus && subMenus.length > 0 ? (
                    <div className={`sub-menu ${expand ? "active" : "" }`}>

                        { subMenus.map((menu, index) => (
                            <li key={index}>
                                <a className="text-decoration-none" href={menu.to}><i className={menu.icon}></i><span>{menu.name}</span></a>
                            </li>
                        ))}

                    </div>
                ) : null
            }

        </li>
    );
};

export default MenuItem;
