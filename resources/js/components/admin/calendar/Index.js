import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-calendar';
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route
} from "react-router-dom";
import axios from 'axios';
import Sidebar from '../family/Sidebar';
import Create from './Create';
import '../../../../css/app.css';
// import 'react-calendar/dist/Calendar.css';


function Index() {

    const [value, onChange] = useState(new Date());
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
                        <h4>Apps</h4>
                        <h6>Calendar</h6>
                    </div>
                    <div className='mb-4'>
                        <Calendar onChange={onChange}
                            value={value}
                            defaultView="month"
                            calendarType="ISO 8601"
                            className="colo-12 bg-white p-2 border border-dark-500 rounded-1 text-center"
                        />
                    </div>
                    <div>
                        <p className=''>
                            <h6>
                                Your events
                            </h6>
                        </p>
                    </div>
                    <div className='mb-4 border border-dark-500 rounded-1'>
                        {events ? (
                            <ul className='list-group list-group-numbered'>
                                {events.map((event) => (
                                    <div key={event.id}>
                                        <li className='text-black-30 fw-bold list-group-item border-0 rounded-1'> {event.title}: <span className='fw-normal'> {event.date} {event.time}</span> </li>
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
if (document.getElementById('calendar')) {
    ReactDOM.render(<Index />, document.getElementById('calendar'));
}
