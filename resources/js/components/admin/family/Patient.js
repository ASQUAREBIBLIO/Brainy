import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route
} from "react-router-dom";
import Sidebar from './Sidebar';
import '../../../../css/app.css';



function Patient() {

    const [patients, setPatient] = useState( [] );

    useEffect( ()=>{
        getPatient();
    },[]);

    const getPatient = async () =>{
        const response = await axios.get(`http://localhost:8000/api/admin/index/patient`);
        setPatient(response.data);
    };

    const deletePatient = async (id) =>{
        await axios.delete(`http://localhost:8000/api/admin/index/patient/${id}`);
        confirm('Do you really want to delete this record ?');
        getPatient();
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
                        <h6>Patient details</h6>
                    </div>
                    <div>
                        {patients.map((patient) => (
                            <div key={patient.id} className="single_advisor_profile" data-wow-delay="0. 2s" style={{}}>

                                {/* <img src={`http://127.0.0.1:8000/images/${patient.image}`} alt=""/> */}

                                <div className="single_advisor_details">
                                    <div className="align"></div>
                                    <div className="single_advisor_details_info">
                                        <span>{patient.name}</span>
                                        <p className="designation">{patient.email}</p>
                                        <p className="designation">{patient.email}</p>
                                        <div className="single_advisor_action">
                                            <button className="edit_btn">
                                                <a href={`/admin/index/family/${patient.id}/edit`}>
                                                    <i className="bi bi-pen-fill"></i>
                                                </a>
                                            </button>

                                            <button onClick={()=>deletePatient(patient.id)} className="trash_btn">
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button className='p-1 border-0 rounded-1'>
                            <a href='/admin/index/patient/new' className='text-black'>Add a patient</a>
                        </button>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default Patient;
if (document.getElementById('patient_profile')) {
    ReactDOM.render(<Patient />, document.getElementById('patient_profile'));
}
