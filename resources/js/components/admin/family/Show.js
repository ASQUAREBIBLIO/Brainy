import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
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

    const deleteMember = async (id) =>{
        await axios.delete(`http://localhost:8000/api/admin/index/family/${id}`);
        confirm('Do you really want to delete this record ?');
        getAllMembers();
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
                            <div key={member.id} className="single_advisor_profile" data-wow-delay="0. 2s" style={{}}>

                                <img src={`http://127.0.0.1:8000/images/${member.image}`} alt=""/>

                                <div className="single_advisor_details">
                                    <div className="align"></div>
                                    <div className="single_advisor_details_info">
                                        <span>{member.name}</span>
                                        <p className="designation">{member.relation}</p>
                                        <p className="designation">{member.phone}</p>
                                        <div className="single_advisor_action">
                                            <button className="edit_btn">
                                                <a href={`/admin/index/family/${member.id}/edit`}>
                                                    <i className="bi bi-pen-fill"></i>
                                                </a>
                                            </button>

                                            <button onClick={()=>deleteMember(member.id)}  className="trash_btn">
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='add_btn'>
                            <a className="text-decoration-none" href='/admin/index/family/create'>
                                <i class="bi bi-person-plus-fill"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Show;
if (document.getElementById('show')) {
    ReactDOM.render(<Show />, document.getElementById('show'));
}
