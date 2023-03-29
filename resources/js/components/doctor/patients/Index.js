import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'react-avatar';
import { Doughnut } from 'react-chartjs-2';
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route
} from "react-router-dom";
import Sidebar from '../user_components/Sidebar';
import '../../../../css/app.css';

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

    return (
        <Router>
            <div className="header">
                <div className="nav">
                    <Sidebar />
                </div>
                <div className="body">
                    <div>
                        <h4>Patients</h4>
                    </div>

                    <div>
                        <a href=''>Your patients</a>
                    </div>

                    <div className='mt-4'>
                        <h6>All patients</h6>
                        <div className='patient_list bg-white p-3 rounded-1'>
                        { patients.map((patient) => (
                            <div className='user-profilep-3 border-bottom border-dark-500'>
                                <div className='user-profile-info'>
                                    <div className='border-2 rounded-circle overflow-auto'>
                                        <Avatar size="80" name={patient.name} src={`http://127.0.0.1:8000/images/${patient.image}`} />
                                    </div>

                                    <div className='text-black p-2'>
                                        <h6 className='text-dark'>{patient.name}</h6>
                                        <button className='add_btn_btn'>Add patient</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default Index;
if (document.getElementById('patients')) {
    ReactDOM.render(<Index />, document.getElementById('patients'));
}
