import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'react-avatar';
import { Doughnut } from 'react-chartjs-2';
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route
} from "react-router-dom";
import Sidebar from './user_components/Sidebar';
import Patients from './patients/Index';
import '../../../css/app.css';

var dateObj = new Date();
var month = dateObj.getMonth() + 1; //months from 1-12
var day = dateObj.getDate();
var year = dateObj.getFullYear();

const Today = year + "-" + month + "-" + day;

function Index() {

    const [patients, setPatients] = useState( [] );
    // const [count, setCount] = useState();

    useEffect( ()=>{
        getAllPatients();
    },[]);

    const getAllPatients = async () =>{
        const response = await axios.get(`http://localhost:8000/api/doctor/index/patients`);
        setPatients(response.data);
    };


    const [events, setEvent] = useState( [] );
    const [date, setDate] = useState();
    // const [count, setCount] = useState();

    useEffect( ()=>{
        getAllEvents();
        getEventDate();
    },[]);

    const getAllEvents = async () =>{
        const response = await axios.get(`http://localhost:8000/api/admin/index/calendar`);
        setEvent(response.data);
    };

    const getEventDate = async () =>{
        const response = await axios.get(`http://localhost:8000/api/admin/index/calendar/d`);
        setDate(response.data);
    };


    return (
        <Router>
            <div className="header">
                <div className="nav">
                    <Sidebar />
                </div>
                <div className="body">
                    <div>
                        <h4>Dashboard</h4>
                    </div>

                    <h6>Patients</h6>
                    <div className='mb-2 d-inline-flex'>
                        { patients.map((patient) => (
                            <div className='border-3 border-dark-30 rounded-circle m-1 overflow-auto'>
                                <Avatar size="60" name={patient.name} src={`http://127.0.0.1:8000/images/${patient.image}`} />
                            </div>
                        ))}
                        <div className='expand_btn m-1'>
                            <a href='/doctor/index/patients'>See all</a>
                        </div>
                    </div>

                    <h6>Your {Today} events</h6>
                    <div className="mb-4 p-2 bg-white border border-dark-500 rounded-1">
                        {events && date === Today ? (
                            <ul className='list-group list-group-numbered text-left'>
                                {events.map((event) => (
                                    <div key={event.id}>
                                        <li className='text-black-30 fw-bold border-0 rounded-1'> {event.title}: <span className='fw-normal'> {event.time}</span> </li>
                                    </div>
                                ))}
                            </ul> ) : (<p className='tex-center fst-italic'>No events for today.</p>)
                        }
                    </div>
                    <div>
                        {/* <Doughnut data={[20, 45]} /> */}
                    </div>
                </div>
            </div>

            <Switch>
                <Route path="/doctor/index" exact component={Index} />
                <Route path="/doctor/index/patients" exact component={Patients} />
            </Switch>
        </Router>
    )
}

export default Index;
if (document.getElementById('doctor')) {
    ReactDOM.render(<Index />, document.getElementById('doctor'));
}
