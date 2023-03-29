import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'react-avatar';
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route
} from "react-router-dom";
import Sidebar from './Sidebar';
import Show from './Show';
import Create from './Create';
import Edit from './Edit';
import '../../../../css/app.css';
import Agenda from '../agenda/Index';
import Calendar from '../calendar/Index';
import CreateCalendar from '../calendar/Create';
import Patient from './Patient';

var dateObj = new Date();
var month = dateObj.getMonth() + 1; //months from 1-12
var day = dateObj.getDate();
var year = dateObj.getFullYear();

const Today = year + "-" + month + "-" + day;

function Index() {

    const [members, setMembers] = useState( [] );
    const [todayEvents, setTodayEvent] = useState([]);
    const [countFam, setCountFam] = useState();
    const [countUser, setCountUser] = useState();
    const [countDoc, setCountDoctor] = useState();
    // const [count, setCount] = useState();
    // const [count, setCount] = useState();

    useEffect( ()=>{
        getAllMembers();
        getTodayEvent();
        countFamily();
        countUsers();
        countDoctor();
    },[]);

    const getAllMembers = async () =>{
        const response = await axios.get(`http://localhost:8000/api/admin/index/family`);
        setMembers(response.data);
    };

    const getTodayEvent = async () =>{
        const response = await axios.get(`http://localhost:8000/api/admin/index/calendar/d`);
        setTodayEvent(response.data);
    };

    const countFamily = async () =>{
        const response = await axios.get(`http://localhost:8000/api/admin/index/family/count`);
        setCountFam(response.data);
    };

    const countUsers = async () =>{
        const response = await axios.get(`http://localhost:8000/api/admin/index/patients/count`);
        setCountUser(response.data);
    };

    const countDoctor = async () =>{
        const response = await axios.get(`http://localhost:8000/api/admin/index/doctor/count`);
        setCountDoctor(response.data);
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
                    <div className='mb-1 d-inline-flex'>
                        { members.map((member) => (
                            <div className='border-3 border-dark rounded-circle m-1 overflow-auto'>
                                <Avatar size="60" name={member.name} src={`http://127.0.0.1:8000/images/${member.image}`} />
                            </div>
                        ))}
                    </div>
                    <div className="numbers mb-2">
                        <div className="numbers-sec">
                            <div>
                                <strong>Patient details</strong>
                                <h5><a href='/admin/index/patient'>See now</a></h5>
                            </div>
                            <div>
                                <strong>Patients</strong>
                                <h4>{countUser}</h4>
                            </div>
                            <div>
                                <strong>Family Members</strong>
                                <h4>{countFam}</h4>
                            </div>
                            <div>
                                <strong>Doctors</strong>
                                <h4>{countDoc}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 p-2 bg-white border border-dark-500 rounded-1">
                        <div className='text-center fw-bold p-1'>Events of the day</div>

                        <ul className='list-group list-group-numbered text-left'>
                            {todayEvents.map((event) => (
                                <div key={event.id}>
                                    <li className='text-black-30 fw-bold border-0 rounded-1'> {event.title}: <span className='fw-normal'> {event.time}</span> </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                    <div className='bg-white border border-dark-50 rounded-1 p-3'>
                       <h4>Reports</h4>
                       <a href='/admin/index/report'>Check now</a>
                    </div>
                </div>
            </div>
            <Switch>
                <Route path="/admin/index" exact component={Index} />
                <Route path="/admin/index/family" exact component={Show} />
                <Route path="/admin/index/family/create" exact component={Create} />
                <Route path="/admin/index/family/:id/edit" exact component={Edit} />
                <Route path="/admin/index/patient" exact component={Patient} />
                <Route path="/admin/index/agenda" exact component={Agenda} />
                {/* <Route path="/admin/index/report" exact component={Report} /> */}
                <Route path="/admin/index/calendar" exact component={Calendar} />
                <Route path="/admin/index/calendar/create" exact component={CreateCalendar} />
            </Switch>
        </Router>
    )
}

export default Index;
if (document.getElementById('admin')) {
    ReactDOM.render(<Index />, document.getElementById('admin'));
}
