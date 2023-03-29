import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
    Link
} from "react-router-dom";
import Sidebar from '../user_components/Sidebar';
import Lg from '../../assets/helmet-1.png';
import Qpng from '../../assets/quiz_png.png';
import '../../../../css/app.css';
// import 'react-calendar/dist/Calendar.css';


function Play() {

    return (
        <Router>
            <div className="header">
                <div className="nav">
                    <Sidebar />
                </div>
                <div className="body">
                    <div>
                        <h4>Apps</h4>
                        <h6>Games</h6>
                    </div>
                    <div className='play-card'>
                        <div className='card-game'>
                            <img src={Lg} alt='memory_game_logo' />
                            <div className='p-4'>
                                <h6>Magic Memory</h6>
                                <a href='/user/index/play/magic-memory'>Start</a>
                            </div>
                        </div>
                        <div className='card-game'>
                            <img src={Qpng} alt='quiz_game_logo' />
                            <div className='p-4'>
                                <h6>Quiz</h6>
                                <a href='/user/index/play/quiz' className='bg-dark-20'>Start</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default Play;
if (document.getElementById('play')) {
    ReactDOM.render(<Play />, document.getElementById('play'));
}
