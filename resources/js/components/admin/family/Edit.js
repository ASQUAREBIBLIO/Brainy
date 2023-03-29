import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Sidebar from './Sidebar';
import '../../../../css/app.css';

function Edit() {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [relation, setRelation] = useState('');
    const [phone, setPhone] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = file => {
        setImage(file[0]);
    }

    const {id} = useParams();

    useEffect(() => {
        getMemberById();
    }, [])


    const handleSave = () => {
        setIsSaving(true);

        const fData = new FormData();
        fData.append('name', name);
        fData.append('image', image);
        fData.append('relation', relation);
        fData.append('phone', phone);

        axios.put(`http://localhost:8000/api/admin/index/family/${id}/edit`, fData)
            .then(function (response) {
                console.log('response',response);
                setIsSaving(false);
            })
            .catch(function (error) {
                console.error('failure',error);

                setIsSaving(false)
            });
    }

    const getMemberById = async () =>{
        await axios.get(`http://localhost:8000/api/admin/index/family/${id}`,{
            'name': name,
            'image': image,
            'relation': relation,
            'phone': phone,
        })
        .catch(function (error) {
            console.log('failure',error);
        })
    };


    return (
        <div className="header">
            <div className="nav">
                <Sidebar />
            </div>
            <div className="body">
                <div>
                    <h4>Family</h4>
                    <h6>Update Family Member</h6>
                    <button className="btn float-end m-0" style={{backgroundColor: "#6963dd"}}>
                        <a className="text-white border-0 text-decoration-none" href='/admin/index/family'>View all family members</a>
                    </button>
                </div>
                <div className="form-controll">
                    <div className="form-card">
                        <div className="form-card-header">
                            <h4>Update family member</h4>
                        </div>

                        <form action='/admin/index/family' encType="multipart/form-data">

                            <div className="row">
                                <label htmlFor="name">name</label>

                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter full name..."
                                    onChange={(event)=>{setName(event.target.value)}}
                                    value={name}

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
                                    value={image}
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
                                    onChange={(event)=>{setRelation(event.target.value)}}
                                    value={relation}

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
                                    onChange={(event)=>{setPhone(event.target.value)}}
                                    value={phone}

                                />
                                <span className="error each">

                                </span>
                            </div>

                            <div className="row m-0">
                                <button type="submit" disabled={isSaving} onClick={handleSave}>
                                    UPDATE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit;
if (document.getElementById('edit')) {
    ReactDOM.render(<Edit />, document.getElementById('edit'));
}
