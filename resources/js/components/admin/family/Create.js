import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../../../../css/app.css';
import { Navigate } from 'react-router-dom';

function Create() {

    // window.axios.defaults.headers.common = {
    //     'X-Requested-With': 'XMLHttpRequest',
    // };

    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [relation, setRelation] = useState('');
    const [phone, setPhone] = useState('');

    const handleChange = file => {
        setImage(file[0]);
    }

    const store = async (e) =>{
        e.preventDefault();

        const headers = {
            "Access-Control-Allow-Origin": "same-origin",
            'Content-Type': 'text/plain'
        };

        const fData = new FormData();

        fData.append('admin_id', id);
        fData.append('name', name);
        fData.append('image', image);
        fData.append('relation', relation);
        fData.append('phone', phone);

        await axios.post(`http://localhost:8000/api/admin/index/family/create`, fData)
        .then((res)=>{
            console.log('response',res);
        })
        .catch((e)=>{
            console.error('failure',e);
        });

        alert('New member has been added.');
    }

    const [admins, setAllAdmins] = useState( [] );
    // const [count, setCount] = useState();

    useEffect( ()=>{
        getAllAdmins();
    },[]);

    const getAllAdmins = async () => {
        const response = await axios.get(`http://localhost:8000/api/admin/index/family/create`);
        setAllAdmins(response.data);
    }


    return (
        <div className="header">
            <div className="nav">
                <Sidebar />
            </div>
            <div className="body">

                <div>
                    <h4>Family</h4>
                    <h6>Add New Family Member</h6>
                    <button className="btn float-end m-0" style={{backgroundColor: "none"}}>
                        <a style={{color: '#6963dd'}} className="border-0 text-decoration-none" href='/admin/index/family'>Back</a>
                    </button>
                </div>
                <div className="form-controll">
                    <div className="form-card">
                        <div className="form-card-header">
                            <h4>Add new family member</h4>
                        </div>

                        <form method='POST' action='admin/index/family/create' onSubmit={store} encType="multipart/form-data">

                            <div className="row">
                                <label>Select You Name</label>

                                <select id="admin_id" name="admin_id" onChange={(e)=>setID(e.target.value)}>
                                { admins.map((admin) => (
                                    <option value={admin.id}>
                                        {admin.name}
                                    </option>
                                ))}
                                </select>
                            </div>

                            <div className="row">
                                <label htmlFor="name">Name</label>

                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter full name..."
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                />

                                <span className="error each">

                                </span>
                            </div>

                            <div className="row">
                                <label htmlFor="image">Image</label>

                                <input
                                    id="image"
                                    type="file"
                                    name="image"
                                    onChange={(e)=>handleChange(e.target.files)}
                                />

                                <span className="error each">

                                </span>
                            </div>


                            <div className="row">
                                <label htmlFor="ralation">Relation</label>

                                <input
                                    id="relation"
                                    type="text"
                                    name="relation"
                                    placeholder="Enter his or her relation to the patient..."
                                    value={relation}
                                    onChange={(e)=>setRelation(e.target.value)}
                                />

                                <span className="error each">

                                </span>
                            </div>

                            <div className="row">
                                <label htmlFor="phone">Phone</label>

                                <input
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    placeholder="+212 6********"
                                    value={phone}
                                    onChange={(e)=>setPhone(e.target.value)}
                                />
                                <span className="error each">

                                </span>
                            </div>

                            <div className="row m-0">
                                <a href='javascript:void(0)'>
                                    <button type="submit" onClick={store}>
                                        SAVE
                                    </button>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create;
if (document.getElementById('create')) {
    ReactDOM.render(<Create />, document.getElementById('create'));
}
