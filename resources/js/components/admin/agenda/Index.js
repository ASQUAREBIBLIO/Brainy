import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route
} from "react-router-dom";
import axios from 'axios';
import Sidebar from '../family/Sidebar';
import '../../../../css/app.css';

var dateObj = new Date();
var month = dateObj.getMonth() + 1; //months from 1-12
var day = dateObj.getDate();
var year = dateObj.getFullYear();

const Today = year + "/" + month + "/" + day;

function Index() {

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

    const deleteEvent = async (id) =>{
        await axios.delete(`http://localhost:8000/api/admin/index/calendar/${id}`);
        confirm('Do you really want to delete this record ?');
        getAllEvents();
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
                                        <div className="single_advisor_action">
                                            <button className="edit_btn">
                                                <a href={`/admin/index/calendar/edit/${event.id}`}>
                                                    <i className="bi bi-pen-fill"></i>
                                                </a>
                                            </button>

                                            <button onClick={()=>deleteEvent(event.id)}       className="trash_btn">
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </ul> ) : (<ul>No events.</ul>)
                        }
                    </div>
                    <div>
                        <button className="btn float-end m-0" style={{backgroundColor: "none"}}>
                            <a style={{color: '#6963dd'}} className="border-0 text-decoration-none" href='/admin/index/calendar/create'>Add new +</a>
                        </button>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default Index;
if (document.getElementById('agenda')) {
    ReactDOM.render(<Index />, document.getElementById('agenda'));
}
