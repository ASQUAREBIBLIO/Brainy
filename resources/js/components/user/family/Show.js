import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Sidebar from '../user_components/Sidebar';
import '../../../../css/app.css';

function Show() {

    const [members, setMembers] = useState( [] );
    // const [count, setCount] = useState();

    useEffect( ()=>{
        getAllMembers();
    },[]);

    const getAllMembers = async () =>{
        const response = await axios.get(`http://localhost:8000/api/admin/index/family`);
        setMembers(response.data);
    };

    return (
        <div className="header">
            <div className="nav">
                <Sidebar />
            </div>
            <div className="body">
                <div>
                    <h4>Family</h4>
                    <h6>Family Members</h6>
                </div>
                <div>
                    <div className="grid">
                        { members.map( (member) => (
                            <div key={member.id} className="single_advisor_profile wow fadeInUp" data-wow-delay="0. 2s" style={{}}>

                                <div className="advisor_thumb">
                                    <img src={`http://127.0.0.1:8000/images/${member.image}`} alt=""/>
                                </div>

                                <div className="single_advisor_details">
                                    <div className="align"></div>
                                    <div className="single_advisor_details_info">
                                        <span>{member.name}</span>
                                        <p className="designation">{member.relation}</p>
                                        <p className="designation">{member.phone}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Show;
if (document.getElementById('family')) {
    ReactDOM.render(<Show />, document.getElementById('family'));
}
