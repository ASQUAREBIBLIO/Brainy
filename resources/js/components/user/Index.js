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
import Show from './family/Show';
import Agenda from './agenda/Agenda';
import UserCalendar from './calendar/UserCalendar';
import Play from './games/Play';
import '../../../css/app.css';
import MagicMemory from './games/MagicMemory';
import Quiz from './games/Quiz';

var dateObj = new Date();
var month = dateObj.getMonth() + 1; //months from 1-12
var day = dateObj.getDate();
var year = dateObj.getFullYear();

const Today = year + "-" + month + "-" + day;

function Index() {

    const [members, setMembers] = useState( [] );
    // const [count, setCount] = useState();

    useEffect( ()=>{
        getAllMembers();
    },[]);

    const getAllMembers = async () =>{
        const response = await axios.get(`http://localhost:8000/api/admin/index/family`);
        setMembers(response.data);
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
                    <div className='mb-2 d-inline-flex'>
                        { members.map((member) => (
                            <div className='border-3 border-dark-30 rounded-circle m-1 overflow-auto'>
                                <Avatar size="60" name={member.name} src={`http://127.0.0.1:8000/images/${member.image}`} />
                            </div>
                        ))}
                    </div>
                    <div className="mb-4 p-2 bg-white border border-dark-500 rounded-1">
                        <div className='text-center fw-bold p-1'>Events of the day</div>
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
                <Route path="/user/index" exact component={Index} />
                <Route path="/user/index/family" exact component={Show} />
                <Route path="/user/index/agenda" exact component={Agenda} />
                <Route path="/user/index/calendar" exact component={UserCalendar} />
                <Route path="/user/index/play" exact component={Play} />
                <Route path="/user/index/play/magic-memory" exact component={MagicMemory} />
                <Route path="/user/index/play/quiz" exact component={Quiz} />
            </Switch>
        </Router>
    )
}

export default Index;
if (document.getElementById('home')) {
    ReactDOM.render(<Index />, document.getElementById('home'));
}
