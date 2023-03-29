import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Sidebar from '../family/Sidebar';
import '../../../../css/app.css';

function Create() {

    window.axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
    };

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [desc, setDesc] = useState('');


    const store = async (e) =>{
        e.preventDefault();
        const fData = new FormData();

        fData.append('title', title);
        fData.append('date', date);
        fData.append('time', time);
        fData.append('description', desc);

        await axios.post(`http://localhost:8000/api/admin/index/calendar/create`, fData)
        .then((res)=>{
            console.log('response',res);
        })
        .catch((e)=>{
            console.error(e.res);
        })

        alert('New calendar added.')
    }

    const [admins, setAllAdmins] = useState( [] );
    // const [count, setCount] = useState();

    useEffect( ()=>{
        getAllAdmins();
    },[]);

    const getAllAdmins = async () => {
        const response = await axios.get(`http://localhost:8000/api/admin/index`);
        setAllAdmins(response.data);
    }


    return (
        <div className="header">
            <div className="nav">
                <Sidebar />
            </div>
            <div className="body">
                <div>
                    <h4>Apps</h4>
                    <h6>Set up new event</h6>
                </div>
                <div className="form-controll">
                    <div className="form-card">
                        <div className="form-card-header">
                            <h4>Set up an event</h4>
                        </div>

                        <form onSubmit={store} method='POST' action='/admin/index/calendar'>

                            <div className="row">
                                <label>Select You Name</label>

                                <select name="admin_id">
                                { admins.map((admin) => (
                                    <option value={admin.id}>
                                        {admin.name}
                                    </option>
                                ))}
                                </select>
                            </div>

                            <div className="row">
                                <label htmlFor="title">Title</label>

                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="Enter event title..."
                                    value={title}
                                    onChange={(e)=>setTitle(e.target.value)}
                                />

                                <span className="error each">

                                </span>
                            </div>

                            <div className="row">
                                <label htmlFor="date">Date</label>

                                <input
                                    id="date"
                                    type="date"
                                    name="date"
                                    placeholder="yyyy-mm-dd"
                                    value={date}
                                    onChange={(e)=>setDate(e.target.value)}
                                />

                                <span className="error each">

                                </span>
                            </div>

                            <div className="row">
                                <label htmlFor="time">Time</label>

                                <input
                                    id="time"
                                    type="time"
                                    name="time"
                                    placeholder="00:00"
                                    value={time}
                                    onChange={(e)=>setTime(e.target.value)}
                                />
                                <span className="error each">

                                </span>
                            </div>

                            <div className="row">
                                <label htmlFor="desc">Description</label>

                                <input
                                    id="desc"
                                    type="text"
                                    name="desc"
                                    placeholder="Enter event description..."
                                    value={desc}
                                    onChange={(e)=>setDesc(e.target.value)}
                                />

                                <span className="error each">

                                </span>
                            </div>

                            <div className="row m-0">
                                <button type="submit" onClick={store}>
                                    <a href='/admin/index/calendar' className='text-white text-decoration-none'>SAVE</a>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create;
if (document.getElementById('calcreate')) {
    ReactDOM.render(<Create />, document.getElementById('calcreate'));
}
