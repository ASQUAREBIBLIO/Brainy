import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route
} from "react-router-dom";
import axios from 'axios';
import Sidebar from '../../user/user_components/Sidebar';
import '../../../../css/app.css';

var dateObj = new Date();
var month = dateObj.getMonth() + 1; //months from 1-12
var day = dateObj.getDate();
var year = dateObj.getFullYear();

const Today = year + "/" + month + "/" + day;

function Agenda() {

    //AIzaSyCeNyXwilG2GDysC_KZlXszZXIB1V6bKes

    const [events, setEvent] = useState( [] );
    // const [count, setCount] = useState();

    useEffect( ()=>{
        getAllEvents();
    },[]);

    const getAllEvents = async () =>{
        const response = await axios.get(`http://localhost:8000/api/admin/index/calendar`);
        setEvent(response.data);
    };

    return (
        <Router>
            <div className="header">
                <div className="nav">
                    <Sidebar />
                </div>
                <div className="body">
                    <div>
                        <h4>Agenda</h4>
                        <h6>All the events</h6>
                    </div>
                    <div>
                        <p className='text-center fs-10'>Current date: {Today}</p>
                    </div>
                    <div className=''>
                        {events ? (
                            <ul className='list-group'>
                                {events.map((event) => (
                                    <div key={event.id} className='fw-bold list-group-item mb-4 border border-dark-500 rounded-1' >
                                        <li className='text-black-30 '>
                                            <strong>{event.title}</strong>
                                            <p>{event.description}</p>
                                            <span className='fw-normal'> {event.date} {event.time}</span>
                                        </li>
                                    </div>
                                ))}
                            </ul> ) : (<ul>No events.</ul>)
                        }
                    </div>
                </div>
            </div>
            <Switch>
            </Switch>
        </Router>
    )
}

export default Agenda;
if (document.getElementById('user_agenda')) {
    ReactDOM.render(<Agenda />, document.getElementById('user_agenda'));
}
